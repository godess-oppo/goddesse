import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const electronics = await prisma.category.create({
    data: { slug: 'electronics', name: 'Electronics' },
  });

  const clothing = await prisma.category.create({
    data: { slug: 'clothing', name: 'Clothing' },
  });

  const books = await prisma.category.create({
    data: { slug: 'books', name: 'Books' },
  });

  const home = await prisma.category.create({
    data: { slug: 'home', name: 'Home & Garden' },
  });

  const sports = await prisma.category.create({
    data: { slug: 'sports', name: 'Sports & Outdoors' },
  });

  // Create admin user
  const adminUser = await prisma.user.create({
    data: {
      email: 'admin@storefront.com',
      passwordHash: '$2b$10$...', // You would hash a real password here
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  });

  // Create regular user
  const regularUser = await prisma.user.create({
    data: {
      email: 'user@storefront.com',
      passwordHash: '$2b$10$...', // You would hash a real password here
      firstName: 'John',
      lastName: 'Doe',
    },
  });

  // Create sample products
  for (let i = 1; i <= 10; i++) {
    await prisma.product.create({
      data: {
        name: `Product ${i}`,
        description: `This is a great product number ${i} that you should definitely buy!`,
        price: Math.floor(Math.random() * 1000) + 10,
        sku: `SKU-${i}-${Math.random().toString(36).substring(2, 7)}`,
        inventoryCount: Math.floor(Math.random() * 100) + 10,
        imageUrl: `https://via.placeholder.com/300x300/4f46e5/ffffff?text=Product+${i}`,
        categoryId: i <= 2 ? electronics.id : 
                   i <= 4 ? clothing.id : 
                   i <= 6 ? books.id : 
                   i <= 8 ? home.id : sports.id,
      },
    });
  }

  console.log('Database seeded with 10 products, 2 users, 5 categories.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
