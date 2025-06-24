import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Harvest } from './harvest.entity';

@Entity('cultures')
export class Culture {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'culture_type' })
  cultureType: string;

  @Column({ name: 'planted_area', type: 'decimal', precision: 10, scale: 2 })
  plantedArea: number;

  @ManyToOne(() => Harvest, harvest => harvest.cultures, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'harvest_id' })
  harvest: Harvest;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}