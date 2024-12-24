import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
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

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => Image, (image) => image.id)
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
