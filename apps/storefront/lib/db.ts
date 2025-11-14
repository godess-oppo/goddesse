// schema.prisma
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  role      Role     @default(CUSTOMER)
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  orders     Order[]
  reviews    Review[]
  sessions   Session[]
}

model Product {
  id          String   @id @default(cuid())
  name        String
  description String
  price       Decimal
  images      String[]
  category    String
  tags        String[]
  featured    Boolean  @default(false)
  inventory   Inventory?
  reviews     Review[]
  orders      OrderItem[]
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Inventory {
  id         String   @id @default(cuid())
  product    Product  @relation(fields: [productId], references: [id])
  productId  String   @unique
  quantity   Int      @default(0)
  lowStock   Int      @default(10)
  updatedAt  DateTime @updatedAt
}

model Order {
  id         String    @id @default(cuid())
  status     OrderStatus @default(PENDING)
  total      Decimal
  user       User      @relation(fields: [userId], references: [id])
  userId     String
  items      OrderItem[]
  createdAt  DateTime  @default(now())
  updatedAt  DateTime  @updatedAt
}

model OrderItem {
  id        String   @id @default(cuid())
  order     Order    @relation(fields: [orderId], references: [id])
  orderId   String
  product   Product  @relation(fields: [productId], references: [id])
  productId String
  quantity  Int
  price     Decimal
}

model Review {
  id        String   @id @default(cuid())
  rating    Int
  comment   String?
  user      User     @relation(fields: [userId], references: [id])
  userId    String
  product   Product  @relation(fields: [productId], references: [id])
  productId String
  createdAt DateTime @default(now())
}

enum Role {
  CUSTOMER
  ADMIN
}

enum OrderStatus {
  PENDING
  PROCESSING
  COMPLETED
  CANCELLED
}
