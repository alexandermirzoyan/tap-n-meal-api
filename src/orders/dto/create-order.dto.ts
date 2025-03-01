export class CreateOrderDto {
  table: number;
  paymentMethod: string;
  products: Array<{
    id: number;
    quantity: number;
    comment?: string;
  }>;
}
