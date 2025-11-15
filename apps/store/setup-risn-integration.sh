#!/bin/bash

set -e

echo "🚀 Setting up RISN CLI Integration..."

# Navigate to store directory
cd ~/workspace/projects/ai-projects/goddesse/apps/store

echo "📁 Creating integration files..."

# 1. Create RISN integration adapter
mkdir -p src/integrations/__tests__
cat > src/integrations/risn.ts << 'EOF'
import { spawn, type SpawnOptions } from 'child_process';
import path from 'path';

export interface RISNConfig {
  cliPath: string;
  env?: NodeJS.ProcessEnv;
}

export interface SyncProductsOptions {
  source?: string;
  target?: string;
  force?: boolean;
}

export interface PushOrderOptions {
  orderId: string;
  dryRun?: boolean;
}

export interface FashionForgeOptions {
  task: string;
  design?: string;
  output?: string;
}

export class RISNIntegration {
  constructor(private config: RISNConfig) {}

  private async executeCommand(
    command: string,
    args: string[] = [],
    options: SpawnOptions = {}
  ): Promise<{ success: boolean; output: string; error?: string }> {
    return new Promise((resolve) => {
      const fullArgs = [command, ...args];
      const child = spawn('node', fullArgs, {
        cwd: this.config.cliPath,
        env: { ...process.env, ...this.config.env },
        ...options,
      });

      let output = '';
      let error = '';

      child.stdout.on('data', (data) => {
        output += data.toString();
      });

      child.stderr.on('data', (data) => {
        error += data.toString();
      });

      child.on('close', (code) => {
        resolve({
          success: code === 0,
          output: output.trim(),
          error: error.trim(),
        });
      });

      child.on('error', (err) => {
        resolve({
          success: false,
          output: '',
          error: err.message,
        });
      });
    });
  }

  async syncProducts(options: SyncProductsOptions = {}): Promise<any> {
    const args = ['products', 'sync'];
    
    if (options.source) args.push('--source', options.source);
    if (options.target) args.push('--target', options.target);
    if (options.force) args.push('--force');

    const result = await this.executeCommand('index.js', args);
    
    if (!result.success) {
      throw new Error(`RISN sync failed: ${result.error}`);
    }

    try {
      return JSON.parse(result.output);
    } catch {
      return { message: result.output };
    }
  }

  async pushOrder(options: PushOrderOptions): Promise<any> {
    const args = ['orders', 'push', options.orderId];
    
    if (options.dryRun) args.push('--dry-run');

    const result = await this.executeCommand('index.js', args);
    
    if (!result.success) {
      throw new Error(`RISN push order failed: ${result.error}`);
    }

    try {
      return JSON.parse(result.output);
    } catch {
      return { message: result.output };
    }
  }

  async runFashionForge(options: FashionForgeOptions): Promise<any> {
    const args = ['fashion-forge', options.task];
    
    if (options.design) args.push('--design', options.design);
    if (options.output) args.push('--output', options.output);

    const result = await this.executeCommand('index.js', args);
    
    return result.success ? result.output : result.error;
  }
}
EOF

# 2. Create API route
mkdir -p src/pages/api/risn
cat > src/pages/api/risn/sync.ts << 'EOF'
import type { NextApiRequest, NextApiResponse } from 'next';
import { RISNIntegration } from '../../../integrations/risn';

// RISN CLI path - adjust based on your Termux environment
const RISN_CLI_PATH = process.env.RISN_CLI_PATH || '/data/data/com.termux/files/home/risn-cli/risn-eco-cli';

const risn = new RISNIntegration({
  cliPath: RISN_CLI_PATH,
  env: {
    NODE_ENV: process.env.NODE_ENV,
    // Add any required RISN environment variables here
  },
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { action, ...options } = req.body;

    switch (action) {
      case 'sync-products':
        const syncResult = await risn.syncProducts(options);
        return res.status(200).json(syncResult);
      
      case 'push-order':
        const pushResult = await risn.pushOrder(options);
        return res.status(200).json(pushResult);
      
      case 'fashion-forge':
        const forgeResult = await risn.runFashionForge(options);
        return res.status(200).json({ result: forgeResult });
      
      default:
        return res.status(400).json({ error: 'Invalid action' });
    }
  } catch (error) {
    console.error('RISN API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
EOF

# 3. Create test file
cat > src/integrations/__tests__/risn.test.ts << 'EOF'
import { RISNIntegration } from '../risn';

// Mock child_process
jest.mock('child_process', () => ({
  spawn: jest.fn(),
}));

import { spawn } from 'child_process';

const mockSpawn = spawn as jest.MockedFunction<typeof spawn>;

describe('RISNIntegration', () => {
  const mockConfig = {
    cliPath: '/test/path',
  };

  let risn: RISNIntegration;

  beforeEach(() => {
    risn = new RISNIntegration(mockConfig);
    mockSpawn.mockClear();
  });

  describe('syncProducts', () => {
    it('should successfully sync products', async () => {
      const mockOutput = JSON.stringify({ synced: 5, failed: 0 });
      
      mockSpawn.mockReturnValue({
        stdout: { on: jest.fn((event, cb) => event === 'data' && cb(mockOutput)) },
        stderr: { on: jest.fn() },
        on: jest.fn((event, cb) => event === 'close' && cb(0)),
      } as any);

      const result = await risn.syncProducts({ source: 'shopify', force: true });
      
      expect(result).toEqual({ synced: 5, failed: 0 });
      expect(mockSpawn).toHaveBeenCalledWith('node', [
        'index.js', 'products', 'sync', '--source', 'shopify', '--force'
      ], expect.any(Object));
    });

    it('should handle sync failure', async () => {
      const mockError = 'Connection failed';
      
      mockSpawn.mockReturnValue({
        stdout: { on: jest.fn() },
        stderr: { on: jest.fn((event, cb) => event === 'data' && cb(mockError)) },
        on: jest.fn((event, cb) => event === 'close' && cb(1)),
      } as any);

      await expect(risn.syncProducts()).rejects.toThrow('RISN sync failed: Connection failed');
    });
  });

  describe('pushOrder', () => {
    it('should successfully push order', async () => {
      const mockOutput = JSON.stringify({ orderId: '123', status: 'pushed' });
      
      mockSpawn.mockReturnValue({
        stdout: { on: jest.fn((event, cb) => event === 'data' && cb(mockOutput)) },
        stderr: { on: jest.fn() },
        on: jest.fn((event, cb) => event === 'close' && cb(0)),
      } as any);

      const result = await risn.pushOrder({ orderId: '123', dryRun: true });
      
      expect(result).toEqual({ orderId: '123', status: 'pushed' });
      expect(mockSpawn).toHaveBeenCalledWith('node', [
        'index.js', 'orders', 'push', '123', '--dry-run'
      ], expect.any(Object));
    });
  });
});
EOF

# 4. Create utility scripts
mkdir -p src/scripts
cat > src/scripts/risn-sync.ts << 'EOF'
import { RISNIntegration } from '../integrations/risn';

const RISN_CLI_PATH = process.env.RISN_CLI_PATH || '/data/data/com.termux/files/home/risn-cli/risn-eco-cli';

async function main() {
  const risn = new RISNIntegration({
    cliPath: RISN_CLI_PATH,
  });

  try {
    const result = await risn.syncProducts();
    console.log('Sync completed:', result);
  } catch (error) {
    console.error('Sync failed:', error);
    process.exit(1);
  }
}

main();
EOF

cat > src/scripts/risn-push.ts << 'EOF'
import { RISNIntegration } from '../integrations/risn';

const RISN_CLI_PATH = process.env.RISN_CLI_PATH || '/data/data/com.termux/files/home/risn-cli/risn-eco-cli';

async function main() {
  const risn = new RISNIntegration({
    cliPath: RISN_CLI_PATH,
  });

  try {
    // Example: push a specific order
    const result = await risn.pushOrder({ orderId: '12345' });
    console.log('Order push completed:', result);
  } catch (error) {
    console.error('Order push failed:', error);
    process.exit(1);
  }
}

main();
EOF

cat > src/scripts/risn-forge.ts << 'EOF'
import { RISNIntegration } from '../integrations/risn';

const RISN_CLI_PATH = process.env.RISN_CLI_PATH || '/data/data/com.termux/files/home/risn-cli/risn-eco-cli';

async function main() {
  const risn = new RISNIntegration({
    cliPath: RISN_CLI_PATH,
  });

  try {
    // Example: run fashion-forge task
    const result = await risn.runFashionForge({ task: 'generate', design: 'dress' });
    console.log('Fashion forge completed:', result);
  } catch (error) {
    console.error('Fashion forge failed:', error);
    process.exit(1);
  }
}

main();
EOF

echo "✅ Integration files created!"
echo ""
echo "📦 Updating package.json scripts..."

# Check if package.json exists and update scripts
if [ -f package.json ]; then
  # Create a backup
  cp package.json package.json.backup
  
  # Use sed to add scripts (if they don't exist)
  if ! grep -q "risn:sync" package.json; then
    sed -i '/"scripts": {/a\    "risn:sync": "ts-node src/scripts/risn-sync.ts",' package.json
    sed -i '/"risn:sync":/a\    "risn:push": "ts-node src/scripts/risn-push.ts",' package.json
    sed -i '/"risn:push":/a\    "risn:forge": "ts-node src/scripts/risn-forge.ts",' package.json
  fi
else
  echo "❌ package.json not found. Please add scripts manually:"
  echo ""
  echo '  "risn:sync": "ts-node src/scripts/risn-sync.ts",'
  echo '  "risn:push": "ts-node src/scripts/risn-push.ts",' 
  echo '  "risn:forge": "ts-node src/scripts/risn-forge.ts"'
fi

echo ""
echo "🎉 RISN integration setup complete!"
echo ""
echo "📋 Next steps:"
echo ""
echo "1. Set RISN CLI path environment variable:"
echo "   export RISN_CLI_PATH=\"/data/data/com.termux/files/home/risn-cli/risn-eco-cli\""
echo ""
echo "2. Make sure risn-cli has its dependencies installed:"
echo "   cd \$RISN_CLI_PATH && npm install"
echo ""
echo "3. Make risn-cli executable:"
echo "   chmod +x \$RISN_CLI_PATH/index.js"
echo ""
echo "4. Test the integration:"
echo "   npm run risn:sync"
echo ""
echo "5. Test API endpoint:"
echo '   curl -X POST http://localhost:3000/api/risn/sync \'
echo '     -H "Content-Type: application/json" \'
echo '     -d '\''{"action": "sync-products", "source": "shopify"}'\'''
echo ""
echo "6. Run tests:"
echo "   npm test -- src/integrations/__tests__/risn.test.ts"
