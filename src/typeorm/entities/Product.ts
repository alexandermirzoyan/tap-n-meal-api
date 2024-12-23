import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Image } from './Image';
import { Tag } from './Tag';

@Entity('products')
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  quantity: number;

  @OneToOne(() => Image, (image) => image.id)
  @JoinColumn({ name: 'image_id' })
  image: Image;

  @ManyToOne(() => Tag, (tag) => tag.id)
  @JoinColumn({ name: 'tag_id' })
  tag: Tag;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
