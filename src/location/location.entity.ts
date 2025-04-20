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
  name: string; // e.g. "Meeting Room 1"

  @Column({ unique: true })
  locationNumber: string; // e.g. "A-01-01-M1"

  @Column()
  building: string;

  @Column('float')
  area: number;

  @TreeParent()
  parent?: Location | null;

  @TreeChildren()
  children: Location[];
}
