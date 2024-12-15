import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './Category';
import { Locale } from './Locale';

@Entity('category_translations')
export class CategoryTranslation {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Category, (category) => category.id)
  @JoinColumn({ name: 'category_id' })
  category_id: number;

  @ManyToOne(() => Locale, (locale) => locale.id)
  @JoinColumn({ name: 'locale_id' })
  locale_id: number;

  @Column()
  name: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
