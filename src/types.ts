export interface OrderType {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  status: string;
  cart: CartType;
}

export interface CartType {
  pizzaId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PizzaInterface {
  id: number;
  name: string;
  unitPrice: number;
  ingredients: unknown;
  soldOut: boolean;
  imageUrl: string;
}

export interface ItemType {
  quantity: number;
  name: string;
  totalPrice: number;
}
