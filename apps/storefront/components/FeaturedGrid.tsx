export default function FeaturedGrid() {
  return (
    <section style={{ padding: '50px 20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Featured Products</h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Product 1</h3>
          <p>$99.99</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Product 2</h3>
          <p>$129.99</p>
        </div>
        <div style={{ 
          padding: '20px', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <h3>Product 3</h3>
          <p>$79.99</p>
        </div>
      </div>
    </section>
  );
}
