import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { OrderProduct } from './OrderProduct';

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  table: number;

  @Column()
  payment_method: string;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts: OrderProduct[];

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
