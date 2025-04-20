// src/location/location.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity('locations')
@Tree('closure-table')
export class Location {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  locationNumber: string;

  @Column()
  building: string;

  @Column('float')
  area: number;

  @TreeParent()
  parent?: Location | null;

  @TreeChildren()
  children: Location[];
}
