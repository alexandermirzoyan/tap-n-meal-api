export class CreateOrderDto {
  table: number;
  products: Array<{
    id: number;
    quantity: number;
    comment?: string;
  }>;
}
