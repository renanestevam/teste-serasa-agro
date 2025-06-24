import { Entity, PrimaryGeneratedColumn, Column, OneToMany, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Property } from './property.entity';

@Entity('producers')
export class Producer {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'cpf_cnpj', unique: true })
  cpfCnpj: string;

  @Column({ name: 'producer_name' })
  producerName: string;

  @OneToMany(() => Property, property => property.producer, { cascade: true })
  properties: Property[];

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}