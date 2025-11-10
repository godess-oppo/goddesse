// E-commerce fashion product entity
class Product {
  constructor({ id, name, category, price, sizes, colors, images }) {
    this.id = id;
    this.name = name;           // e.g., "Quantum Silk Dress"
    this.category = category;   // "dresses", "shoes", "accessories"
    this.price = new Price(price); // Value object
    this.sizes = sizes;         // ["XS", "S", "M", "L"]
    this.colors = colors;       // ["#000000", "#FFFFFF"]
    this.images = images;       // CDN URLs
    this.createdAt = new Date();
  }
  
  isInStock() {
    return this.inventory > 0;
  }
}
