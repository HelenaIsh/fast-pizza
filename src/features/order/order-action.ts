import { redirect, type ActionFunctionArgs } from 'react-router-dom';
import type { CartType } from '../../types';
import { createOrder } from '../../services/apiRestaurant';
import { clearCart } from '../cart/cartSlice';
import store from '../../store';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

export async function action({ request }: ActionFunctionArgs) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const cartValue = typeof data.cart === 'string' ? data.cart : '';

  const order = {
    ...data,
    cart: JSON.parse(cartValue) as CartType[],
    priority: data.priority === 'on',
    estimatedDelivery: '',
    id: '',
    status: '',
    customer: data.customer as string,
    phone: data.phone as string,
    address: data.address as string,
  };

  const newOrder = await createOrder(order);

  const errors: { phone?: string } = {};
  if (!isValidPhone(order.phone))
    errors.phone = 'Please give us correct phone number';

  if (Object.keys(errors).length > 0) {
    return errors;
  }

  store.dispatch(clearCart());
  return redirect(`/order/${newOrder.id}`);
}
