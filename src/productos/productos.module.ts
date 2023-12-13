import { Module } from '@nestjs/common';
import { ProductService } from './productos.service';
import { ProductController } from './productos.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductosModule {}
