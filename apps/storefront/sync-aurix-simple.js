const fs = require('fs');
const path = require('path');

console.log('🔄 SYNCING AURIX PRODUCTS...');

// Path to your AURIX products
const aurixPath = path.join(__dirname, '..', '..', '..', 'risn-cli', 'products');
console.log('Looking for AURIX products in:', aurixPath);

try {
  // Get AURIX product files
  const productFiles = fs.readdirSync(aurixPath).filter(f => f.endsWith('.json'));
  console.log(`📦 Found ${productFiles.length} AURIX design files`);
  
  const products = productFiles.map(file => {
    const content = fs.readFileSync(path.join(aurixPath, file), 'utf8');
    const product = JSON.parse(content);
    return {
      id: file.replace('.json', ''),
      name: product.name || 'AURIX Design',
      price: product.price || 99.99,
      description: product.description || 'AI-generated fashion design',
      category: 'aurix-ai',
      image: `/aurix-${file.replace('.json', '')}.jpg`,
      inStock: true,
      featured: productFiles.indexOf(file) < 3
    };
  });

  console.log('🎨 AURIX Products loaded:');
  products.forEach(p => console.log(`   • ${p.name} - $${p.price}`));

  // Generate simple products.yaml
  const yamlContent = `# AURIX AI FASHION DESIGNS
# Auto-synced on ${new Date().toISOString()}

products:
${products.map(p => `  - id: "${p.id}"
    name: "${p.name}"
    price: ${p.price}
    description: "${p.description}"
    category: "${p.category}"
    image: "${p.image}"
    inStock: ${p.inStock}
    featured: ${p.featured}`).join('\n')}
`;

  // Update products.yaml
  fs.writeFileSync('products.yaml', yamlContent);
  console.log('✅ Updated products.yaml with AURIX designs');
  
} catch (error) {
  console.log('❌ Error:', error.message);
  console.log('💡 Make sure AURIX products exist at:', aurixPath);
}
