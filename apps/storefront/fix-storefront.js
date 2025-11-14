const fs = require('fs');
const { exec } = require('child_process');

console.log('🔧 DIAGNOSING STOREFRONT...');

// Check common issues
const checks = [
  { name: 'Node Version', check: () => process.version },
  { name: 'Package.json', check: () => fs.existsSync('package.json') },
  { name: 'Products YAML', check: () => fs.existsSync('products.yaml') },
  { name: 'Next.js Config', check: () => fs.existsSync('next.config.js') },
  { name: 'Dependencies', check: () => fs.existsSync('node_modules') }
];

checks.forEach(({ name, check }) => {
  try {
    const result = check();
    console.log(`✅ ${name}:`, result || 'OK');
  } catch (error) {
    console.log(`❌ ${name}:`, error.message);
  }
});

// Try to build
console.log('\n🏗️ Testing build...');
exec('npm run build', (error, stdout, stderr) => {
  if (error) {
    console.log('❌ Build failed:', error.message);
    console.log('STDERR:', stderr.slice(-200));
  } else {
    console.log('✅ Build successful');
  }
});
