export interface OrderType {
  id: string;
  customer: string;
  phone: string;
  address: string;
  priority: boolean;
  estimatedDelivery: string;
  status: string;
  cart: CartType[];
}

export interface CartType {
  pizzaId: string;
  name: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
}

export interface PizzaType {
  id: string;
  name: string;
  unitPrice: number;
  ingredients: string[];
  soldOut: boolean;
  imageUrl: string;
}

export interface UserType {
  username: string;
}
