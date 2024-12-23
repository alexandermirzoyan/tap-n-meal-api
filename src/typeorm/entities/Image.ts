import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('images')
export class Image {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;
}
