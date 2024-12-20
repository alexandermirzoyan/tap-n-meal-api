import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Product } from './Product';
import { Locale } from './Locale';

@Entity('product_description_translations')
export class ProductDescriptionTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Product, (product) => product.id)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @ManyToOne(() => Locale, (locale) => locale.id)
  @JoinColumn({ name: 'locale_id' })
  locale: Locale;

  @Column()
  description: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
