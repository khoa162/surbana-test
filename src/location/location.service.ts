import {
  Injectable,
  Logger,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TreeRepository } from 'typeorm';
import { Location } from './location.entity';
import { CreateLocationDto } from './dto/create-location.dto';

@Injectable()
export class LocationService {
  private readonly logger = new Logger(LocationService.name);

  constructor(
    @InjectRepository(Location)
    private readonly locationRepo: TreeRepository<Location>,
  ) {}

  async create(dto: CreateLocationDto): Promise<Location> {
    const location = new Location();
    location.name = dto.name;
    location.locationNumber = dto.locationNumber;
    location.building = dto.building;
    location.area = dto.area;

    if (dto.parentId) {
      const parent = await this.locationRepo.findOneBy({ id: dto.parentId });
      if (!parent) {
        this.logger.warn(`Parent ID ${dto.parentId} not found`);
        throw new NotFoundException(`Parent location with ID ${dto.parentId} not found`);
      }
      location.parent = parent;
    }

    try {
      const saved = await this.locationRepo.save(location);
      this.logger.log(`Created location: ${saved.locationNumber} (ID: ${saved.id})`);
      return saved;
    } catch (err) {
      if (err.code === '23505') {
        this.logger.warn(`Duplicate location number: ${dto.locationNumber}`);
        throw new ConflictException('Location number must be unique');
      }
      this.logger.error('Failed to create location', err.stack);
      throw new InternalServerErrorException('Failed to create location');
    }
  }

  async findAll(): Promise<Location[]> {
    try {
      const result = await this.locationRepo.find({
        relations: ['parent'],
      });
      this.logger.log(`Fetched ${result.length} locations`);
      return result;
    } catch (err) {
      this.logger.error('Failed to fetch locations', err.stack);
      throw new InternalServerErrorException('Failed to fetch locations');
    }
  }

  async findTree(): Promise<Location[]> {
    try {
      const result = await this.locationRepo.findTrees();
      this.logger.log(`Fetched location tree with ${result.length} root nodes`);
      return result;
    } catch (err) {
      this.logger.error('Failed to fetch location tree', err.stack);
      throw new InternalServerErrorException('Failed to fetch location tree');
    }
  }

  async findOne(id: number): Promise<Location> {
    const location = await this.locationRepo.findOne({
      where: { id },
      relations: ['parent', 'children'],
    });

    if (!location) {
      this.logger.warn(`Location with ID ${id} not found`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    this.logger.log(`Fetched location ID: ${id}`);
    return location;
  }

  async remove(id: number): Promise<void> {
    const location = await this.locationRepo.findOneBy({ id });
    if (!location) {
      this.logger.warn(`Location to delete with ID ${id} not found`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }

    try {
      await this.locationRepo.remove(location);
      this.logger.log(`Deleted location ID: ${id}`);
    } catch (err) {
      this.logger.error(`Failed to delete location ID: ${id}`, err.stack);
      throw new InternalServerErrorException('Failed to delete location');
    }
  }

  async update(id: number, dto: CreateLocationDto): Promise<Location> {
    const location = await this.locationRepo.findOne({
      where: { id },
      relations: ['parent'],
    });
  
    if (!location) {
      this.logger.warn(`Location to update with ID ${id} not found`);
      throw new NotFoundException(`Location with ID ${id} not found`);
    }
  
    location.name = dto.name;
    location.locationNumber = dto.locationNumber;
    location.building = dto.building;
    location.area = dto.area;
  
    if (dto.parentId) {
      const parent = await this.locationRepo.findOneBy({ id: dto.parentId });
      if (!parent) {
        this.logger.warn(`Parent ID ${dto.parentId} not found`);
        throw new NotFoundException(`Parent location with ID ${dto.parentId} not found`);
      }
      location.parent = parent;
    } else {
      location.parent = null;
    }
  
    try {
      const updated = await this.locationRepo.save(location);
      this.logger.log(`Updated location: ${updated.locationNumber} (ID: ${updated.id})`);
      return updated;
    } catch (err) {
      if (err.code === '23505') {
        this.logger.warn(`Duplicate location number: ${dto.locationNumber}`);
        throw new ConflictException('Location number must be unique');
      }
      this.logger.error(`Failed to update location ID: ${id}`, err.stack);
      throw new InternalServerErrorException('Failed to update location');
    }
  }
}
