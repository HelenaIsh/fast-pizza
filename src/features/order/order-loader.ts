import type { LoaderFunctionArgs } from 'react-router-dom';
import { getOrder } from '../../services/apiRestaurant';

export async function loader({ params }: LoaderFunctionArgs) {
  if (!params.orderId) return;
  const order = await getOrder(params.orderId);
  return order;
}
