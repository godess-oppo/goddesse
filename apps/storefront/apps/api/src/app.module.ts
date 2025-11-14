import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { CategoriesModule } from './categories/categories.module';
import { ReviewsModule } from './reviews/reviews.module';
import { PrismaService } from './prisma.service';

@Module({
  imports: [
    AuthModule,
    ProductsModule,
    CartModule,
    OrdersModule,
    CategoriesModule,
    ReviewsModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
