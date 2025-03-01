import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Product } from './Product';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  uuid: string;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product_id: number;

  @Column()
  count: number;

  @Column()
  comment: string;

  @Column()
  table: number;

  @Column()
  payment_method: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
