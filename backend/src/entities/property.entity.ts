import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Producer } from './producer.entity';
import { Harvest } from './harvest.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'farm_name' })
  farmName: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @Column({ name: 'total_area', type: 'decimal', precision: 10, scale: 2 })
  totalArea: number;

  @Column({ name: 'cultivable_area', type: 'decimal', precision: 10, scale: 2 })
  cultivableArea: number;

  @Column({ name: 'vegetation_area', type: 'decimal', precision: 10, scale: 2 })
  vegetationArea: number;

  @ManyToOne(() => Producer, producer => producer.properties, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'producer_id' })
  producer: Producer;

  @OneToMany(() => Harvest, harvest => harvest.property, { cascade: true })
  harvests: Harvest[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}