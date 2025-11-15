const fs = require('fs');
const path = require('path');

function findUndefinedExports(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory() && !file.includes('node_modules')) {
      findUndefinedExports(fullPath);
    } else if (file.match(/\.(js|jsx|ts|tsx)$/) && !file.includes('node_modules')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('export default undefined') || 
          content.includes('export default null')) {
        console.log('❌ Problematic file:', fullPath);
      }
    }
  }
}

findUndefinedExports('.');
