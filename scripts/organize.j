#!/usr/bin/env node
// /scripts/organize.js - Heisenberg's Uncertainty Organizer

const fs = require('fs-extra');
const path = require('path');
const { execSync } = require('child_process');

class QuantumOrganizer {
  constructor() {
    this.root = path.resolve(__dirname, '..');
    this.stateFile = path.join(this.root, '.quantum-state.json');
    this.loadState();
  }

  loadState() {
    this.state = fs.existsSync(this.stateFile) 
      ? fs.readJsonSync(this.stateFile) 
      : { collapsed: {}, entanglements: {}, observers: {} };
  }

  saveState() {
    fs.writeJsonSync(this.stateFile, this.state, { spaces: 2 });
  }

  // **SCHRÖDINGER'S FOLDERS**: Collapse on observation
  async materialize(app) {
    const appPath = path.join(this.root, 'superposition/apps', app);
    
    // Only create if observed (package.json exists)
    if (!fs.existsSync(`${appPath}/package.json`)) {
      console.log(`🌌 App '${app}' still in superposition. Use 'pnpm init --app=${app}' to collapse.`);
      return;
    }

    console.log(`⚛️ Collapsing wavefunction for ${app}...`);
    
    // Generate scaffold only when needed
    await fs.ensureDir(appPath);
    await this.generateQuantumScaffold(app, appPath);
    
    this.state.collapsed[app] = Date.now();
    this.saveState();
  }

  // **ENTANGLED DEPENDENCIES**: Create symlink quantum tunnel
  entangle(source, target, tag = 'schema') {
    const sourcePath = path.join(this.root, 'entangled', source);
    const targetPath = path.join(this.root, 'superposition/apps', target, 'src', tag);
    
    // Create bidirectional entanglement
    fs.ensureSymlinkSync(sourcePath, targetPath, 'junction');
    
    this.state.entanglements[`${source}<->${target}`] = {
      created: Date.now(),
      type: tag
    };
    this.saveState();
    
    console.log(`🔗 Entangled ${source} ↔ ${target} via ${tag}`);
  }

  // **HEISENBERG'S DOCUMENTATION**: Role-based README
  generateReadme(role = 'developer') {
    const templates = {
      developer: `# Quantum Project (Dev View)\n\n## Core Qubits\n- Run \\`pnpm observe --test\\` to measure test coverage\n- Entangle new schemas: \\`node scripts/organize.js entangle schemas/api web\\`\n`,
      architect: `# Quantum Project (Arch View)\n\n## Waveform Entanglements\n${JSON.stringify(this.state.entanglements, null, 2)}\n\n## Uncollapsed Apps: ${Object.keys(this.state.collapsed).length}/3\n`,
      product: `# Quantum Project (PM View)\n\n## Observable Features\n- Web app: ${this.state.collapsed.web ? '✅ Materialized' : '⏳ In superposition'}\n- API: ${this.state.collapsed.api ? '✅ Materialized' : '⏳ In superposition'}\n`
    };
    
    return templates[role] || templates.developer;
  }

  // **QUANTUM OBSERVER**: Run tests without collapsing dev state
  async observe(type) {
    console.log(`👁️  Observing ${type}...`);
    
    const observerPath = path.join(this.root, 'observers', `${type}-observer`);
    if (!fs.existsSync(observerPath)) {
      await this.generateObserver(type, observerPath);
    }
    
    // Run observer (e.g., Jest in --watch mode)
    execSync(`pnpm test:${type}`, { stdio: 'inherit' });
    
    this.state.observers[type] = Date.now();
    this.saveState();
  }

  async generateQuantumScaffold(app, appPath) {
    const quantumConfig = {
      api: { 
        type: 'nextjs-api', 
        deps: ['express', 'typescript'],
        entanglements: ['schemas/backend-observable']
      },
      web: { 
        type: 'nextjs-web', 
        deps: ['react', 'framer-motion', '@react-three/fiber'],
        entanglements: ['schemas/frontend-observable', 'ui']
      },
      docs: { 
        type: 'nextjs-static', 
        deps: ['next', 'react']
      }
    };

    const config = quantumConfig[app];
    if (!config) return;

    // Collapse package.json from quantum foam
    const pkgJson = {
      name: `@goddesse/${app}`,
      version: '0.1.0-quantum',
      scripts: {
        dev: `next dev -p ${app === 'api' ? 3001 : app === 'web' ? 3000 : 3002}`,
        build: 'next build',
        observe: 'node ../../scripts/organize.js observe unit'
      },
      dependencies: Object.fromEntries(
        config.deps.map(dep => [dep, 'workspace:*'])
      )
    };

    await fs.writeJson(path.join(appPath, 'package.json'), pkgJson, { spaces: 2 });
    
    // Create entangled symlinks
    config.entanglements?.forEach(e => this.entangle(e, app));
  }

  async generateObserver(type, observerPath) {
    await fs.ensureDir(observerPath);
    const testFile = path.join(observerPath, `${type}.spec.ts`);
    await fs.writeFile(testFile, 
      `// Quantum observer: measures ${type} without collapsing\nimport { expect } from '@jest/globals';\n\ntest('observes ${type} state', () => {\n  const state = require('../../.quantum-state.json');\n  expect(state.observers['${type}']).toBeDefined();\n});`);
  }
}

// CLI Interface
const [,, command, ...args] = process.argv;
const organizer = new QuantumOrganizer();

switch(command) {
  case 'materialize':
    organizer.materialize(args[0]);
    break;
  case 'entangle':
    organizer.entangle(args[0], args[1], args[2]);
    break;
  case 'observe':
    organizer.observe(args[0]);
    break;
  case 'readme':
    console.log(organizer.generateReadme(args[0]));
    break;
  case 'collapse-all':
    ['api', 'web', 'docs'].forEach(app => organizer.materialize(app));
    break;
  default:
    console.log(`Heisenberg's Commands:
  materialize <app>     - Collapse app from superposition
  entangle <pkg> <app> [tag] - Create symlink entanglement
  observe <type>        - Run observer without collapsing
  readme [role]         - Generate role-based documentation
  collapse-all          - Materialize all apps`);
}
