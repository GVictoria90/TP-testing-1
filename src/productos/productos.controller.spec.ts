import { Test, TestingModule } from '@nestjs/testing';
import { ProductosController } from './productos.controller';
import { ProductosService } from './productos.service';

describe('ProductosController', () => {
  let controller: ProductosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductosController],
      providers: [ProductosService],
    }).compile();

    controller = module.get<ProductosController>(ProductosController);
  });
  const data: Products = [{id: 1, nombre: 'tv', precio: 50}]; /*para buscar poner id para crear no va id*/
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
