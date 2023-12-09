import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './productos.controller';
import { ProductService } from './productos.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of products', () => {
      jest.spyOn(service, 'findAll').mockReturnValueOnce([{ id: 1, nombre: 'PIZARRA', precio: 1000 }]);
      expect(controller.findAll()).toEqual([{ id: '1', nombre: 'PIZARRA', precio: 1000 }]);
    });
  });

  describe('findById', () => {
    it('should return a specific product by ID', () => {
      jest.spyOn(service, 'findById').mockReturnValueOnce({ id: 1, nombre: 'PIZARRA', precio: 1500 });
      expect(controller.findById(1)).toEqual({ id: '1', nombre: 'PIZARRA', precio: 1500 });
    });

    it('should throw NotFoundException if the product is not found', () => {
      jest.spyOn(service, 'findById').mockImplementation(() => {
        throw new NotFoundException('Product not found');
      });
      expect(() => controller.findById('nonexistent')).toThrow(NotFoundException);
    });
  });

  describe('create', () => {
    it('should create and return a new product', () => {
      const newProduct = {id: 0, nombre: 'Nuevo ingreso', precio: 2000 };
      jest.spyOn(service, 'create').mockReturnValueOnce({ id: 2, ...newProduct });
      expect(controller.create(newProduct)).toEqual({ id: 2, ...newProduct });
    });
  });

  describe('update', () => {
    it('si es exitoso debe retornar el producto actualizado', () => {
      const updatedProduct = { id: 1, nombre: 'PIZARRON', precio: 1500 };
      jest.spyOn(service, 'update').mockReturnValueOnce({ id: 1, ...updatedProduct });
      expect(controller.update(1, updatedProduct)).toEqual({ id: 1, ...updatedProduct });
    });

    it('si no se encuentra, envia una excepcion', () => {
      const updatedProduct = {id: 1, nombre: 'PIZARRON', precio: 2000};
      jest.spyOn(service, 'update').mockImplementation(() => {
        throw new NotFoundException('Product not found');
      });
      expect(() => controller.update('nonexistent', updatedProduct)).toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('si se borra de forma exitosa retorna', () => {
      jest.spyOn(service, 'delete').mockReturnValueOnce({ id: 1, nombre: 'PIZARRA', precio: 2000 });
      expect(controller.delete(1)).toEqual({ id: 1, nombre: 'PIZARRA' });
    });

    it('Si no se encuentra el producto envia una excepcion', () => {
      jest.spyOn(service, 'delete').mockImplementation(() => {
        throw new NotFoundException('Producto no encontrado');
      });
      expect(() => controller.delete('NoExiste')).toThrow(NotFoundException);
    });
  });
});
