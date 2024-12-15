import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('locales')
export class Locale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;
}
