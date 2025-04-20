// src/location/location.controller.ts
import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { LocationService } from './location.service';
import { CreateLocationDto } from './dto/create-location.dto';
import { Location } from './location.entity';
import { ApiTags, ApiOperation, ApiParam, ApiBody } from '@nestjs/swagger';

@ApiTags('locations')
@Controller('locations')
export class LocationController {
  constructor(private readonly locationService: LocationService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiBody({ type: CreateLocationDto })
  create(@Body() dto: CreateLocationDto): Promise<Location> {
    return this.locationService.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Get flat list of locations' })
  findAll(): Promise<Location[]> {
    return this.locationService.findAll();
  }

  @Get('tree')
  @ApiOperation({ summary: 'Get hierarchical location tree' })
  findTree(): Promise<Location[]> {
    return this.locationService.findTree();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a specific location by ID' })
  @ApiParam({ name: 'id', type: Number })
  findOne(@Param('id') id: string): Promise<Location | null> {
    return this.locationService.findOne(+id);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a location by ID' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: string): Promise<void> {
    return this.locationService.remove(+id); // convert into number
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiBody({ type: CreateLocationDto })
  update(
    @Param('id') id: string,
    @Body() dto: CreateLocationDto,
  ): Promise<Location> {
    return this.locationService.update(+id, dto);
}
}
