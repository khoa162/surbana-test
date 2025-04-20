import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateLocationDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  locationNumber: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  building: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  area: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  parentId?: number | null;
}
