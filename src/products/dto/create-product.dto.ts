export class CreateProductDto {
  price: number;
  quantity: number;
  image_src: string;
  tag_id?: number;
  name: {
    en: string;
    hy: string;
    ru: string;
  };
  description: {
    en: string;
    hy: string;
    ru: string;
  };
}
