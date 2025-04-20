import { Test, TestingModule } from '@nestjs/testing';
import { LocationController } from './location.controller';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
// import { UpdateLocationDto } from './dto/update-location.dto';

describe('LocationController', () => {
  let controller: LocationController;
  let service: LocationService;

  const mockService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationController],
      providers: [
        {
          provide: LocationService,
          useValue: mockService,
        },
      ],
    }).compile();

    controller = module.get<LocationController>(LocationController);
    service = module.get<LocationService>(LocationService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call service.create with dto and return result', async () => {
      const dto: CreateLocationDto = {
        name: 'Test Location',
        locationNumber: 'A-TEST',
        building: 'Test Building',
        area: 123.45,
        parentId: null,
      };
      const result = { id: 1, ...dto };
      mockService.create.mockResolvedValue(result);

      expect(await controller.create(dto)).toEqual(result);
      expect(mockService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return all locations', async () => {
      const result = [{ id: 1, name: 'L1' }];
      mockService.findAll.mockResolvedValue(result);

      expect(await controller.findAll()).toEqual(result);
    });
  });

  describe('findOne', () => {
    it('should return a location by id', async () => {
      const result = { id: 1, name: 'L1' };
      mockService.findOne.mockResolvedValue(result);

      expect(await controller.findOne('1')).toEqual(result);
      expect(mockService.findOne).toHaveBeenCalledWith(1);
    });
  });

  describe('update', () => {
    it('should update and return updated location', async () => {
      const dto = {
        name: 'Updated L1',
        locationNumber: 'A-01-01-U1',
        building: 'Building A',
        area: 25.5,
        parentId: null,
      };
      const result = { id: 1, ...dto };
      mockService.update.mockResolvedValue(result);
  
      const res = await controller.update('1', dto);
      expect(res).toEqual(result);
      expect(mockService.update).toHaveBeenCalledWith(1, dto);
    });
  });
  

  describe('remove', () => {
    it('should remove location by id', async () => {
      mockService.remove.mockResolvedValue({ deleted: true });

      expect(await controller.remove('1')).toEqual({ deleted: true });
      expect(mockService.remove).toHaveBeenCalledWith(1);
    });
  });
});
