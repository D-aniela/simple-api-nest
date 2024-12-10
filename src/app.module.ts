import * as dotenv from 'dotenv';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PicturesModule } from './pictures/pictures.module';
import { CategoriesModule } from './categories/categories.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { UsersModule } from './users/users.module';
import { AddressesModule } from './addresses/addresses.module';
import { CartsModule } from './carts/carts.module';

dotenv.config();

console.log('MONGO_URI:', process.env.MONGO_URI);

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production.local'
          : '.env',
      isGlobal: true, // Hace que las variables estén disponibles en todos los módulos
    }),
    MongooseModule.forRoot(process.env.MONGO_URI, { dbName: 'e-commerce-api' }),
    PicturesModule,
    CategoriesModule,
    CloudinaryModule,
    ProductsModule,
    OrdersModule,
    UsersModule,
    AddressesModule,
    CartsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
