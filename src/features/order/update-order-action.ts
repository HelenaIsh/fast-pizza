import type { ActionFunctionArgs } from 'react-router-dom';
import { updateOrder } from '../../services/apiRestaurant';

export async function action({ params }: ActionFunctionArgs) {
  if (params.orderId) {
    const data = { priority: true };
    await updateOrder(params.orderId, data);
  }
  return null;
}
