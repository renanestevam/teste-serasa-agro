import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, CreateDateColumn, UpdateDateColumn, JoinColumn } from 'typeorm';
import { Property } from './property.entity';
import { Culture } from './culture.entity';

@Entity('harvests')
export class Harvest {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  year: number;

  @Column()
  season: string;

  @ManyToOne(() => Property, property => property.harvests, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'property_id' })
  property: Property;

  @OneToMany(() => Culture, culture => culture.harvest, { cascade: true })
  cultures: Culture[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}