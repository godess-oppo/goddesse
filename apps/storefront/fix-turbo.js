const fs = require('fs');
const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));

// Fix the dev script to avoid turbo loop
if (packageJson.scripts.dev.includes('turbo run dev')) {
  packageJson.scripts.dev = 'next dev';
  fs.writeFileSync('package.json', JSON.stringify(packageJson, null, 2));
  console.log('✅ Fixed turbo infinite loop in dev script');
}

// Also check if there are multiple dev scripts
console.log('Current dev script:', packageJson.scripts.dev);
