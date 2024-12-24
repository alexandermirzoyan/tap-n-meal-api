import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { Image } from './Image';
import { Tag } from './Tag';
import { ProductNameTranslation } from './ProductNameTranslation';
import { ProductDescriptionTranslation } from './ProductDescriptionTranslation';

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

  @OneToMany(() => ProductNameTranslation, (translation) => translation.product)
  name: ProductNameTranslation[];

  @OneToMany(
    () => ProductDescriptionTranslation,
    (translation) => translation.product,
  )
  description: ProductDescriptionTranslation[];
}
