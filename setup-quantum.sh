# Create this file: /root/goddesse/setup-quantum.sh
#!/bin/bash
set -e

echo "⚛️ Initializing Quantum File System..."

# 1. CORRECT: Create directory structure first
mkdir -p superposition/apps/{api,web,docs}
mkdir -p packages/{ui,api-client,utils,config}
mkdir -p services/{api-gateway,product-service,order-service}
mkdir -p platform/{terraform,scripts}
mkdir -p docs/{architecture,onboarding}
mkdir -p tests/e2e

# 2. CORRECT: Create the CLI as a FILE, not a directory
mkdir -p scripts
cat > scripts/organize.js << 'EOF'
#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const STATE_FILE = path.join(ROOT, '.quantum-state.json');

// Load quantum state (or create superposition)
function loadState() {
  if (!fs.existsSync(STATE_FILE)) {
    return { collapsed: {}, entanglements: {}, observers: {} };
  }
  return JSON.parse(fs.readFileSync(STATE_FILE, 'utf8'));
}

function saveState(state) {
  fs.writeFileSync(STATE_FILE, JSON.stringify(state, null, 2));
}

// **SCHRÖDINGER'S FOLDERS**: Only materialize when package.json exists
function materialize(app) {
  const state = loadState();
  const appPath = path.join(ROOT, 'superposition/apps', app);
  
  if (!fs.existsSync(path.join(appPath, 'package.json'))) {
    console.log(`🌌 App '${app}' is in superposition. Creating scaffold...`);
    
    // Generate scaffold on first observation
    const config = {
      api: { port: 3001, deps: ['express'], type: 'nextjs-api' },
      web: { port: 3000, deps: ['react', 'framer-motion'], type: 'nextjs-web' },
      docs: { port: 3002, deps: ['next'], type: 'nextjs-static' }
    };
    
    const pkg = {
      name: `@goddesse/${app}`,
      version: "0.1.0-quantum",
      scripts: {
        dev: `next dev -p ${config[app].port}`,
        build: "next build"
      },
      dependencies: Object.fromEntries(config[app].deps.map(d => [d, "workspace:*"]))
    };
    
    fs.mkdirSync(appPath, { recursive: true });
    fs.writeFileSync(path.join(appPath, 'package.json'), JSON.stringify(pkg, null, 2));
  }
  
  state.collapsed[app] = Date.now();
  saveState(state);
  console.log(`⚛️ Collapsed ${app} into existence at ${appPath}`);
}

// **ENTANGLED DEPENDENCIES**: Create actual symlinks
function entangle(source, target, tag = 'shared') {
  const sourcePath = path.join(ROOT, 'packages', source);
  const targetPath = path.join(ROOT, 'superposition/apps', target, tag);
  
  if (fs.existsSync(sourcePath)) {
    fs.symlinkSync(sourcePath, targetPath, 'dir');
    console.log(`🔗 Entangled ${source} → ${target}/${tag}`);
  }
}

// CLI Dispatcher
const [cmd, ...args] = process.argv.slice(2);
switch(cmd) {
  case 'materialize':
    materialize(args[0]);
    break;
  case 'entangle':
    entangle(args[0], args[1], args[2]);
    break;
  case 'status':
    console.log('Quantum State:', loadState());
    break;
  default:
    console.log(`
Usage:
  node scripts/organize.js materialize <app>   # Create app from superposition
  node scripts/organize.js entangle <pkg> <app> [tag]  # Create symlink
  node scripts/organize.js status              # Show current state
    `);
}
EOF

chmod +x scripts/organize.js

# 3. Initialize pnpm workspace correctly
cat > pnpm-workspace.yaml << EOF
packages:
  - 'superposition/apps/*'
  - 'packages/*'
  - 'services/*'
EOF

# 4. Create root package.json (pnpm DOES support filter here)
cat > package.json << EOF
{
  "name": "goddesse-quantum",
  "version": "1.0.0",
  "private": true,
  "scripts": {
    "dev": "pnpm -r --parallel dev",
    "materialize": "node scripts/organize.js"
  }
}
EOF

echo "✅ Quantum structure created! Now run:"
echo "  ./scripts/organize.js materialize web"
echo "  ./scripts/organize.js materialize api"
