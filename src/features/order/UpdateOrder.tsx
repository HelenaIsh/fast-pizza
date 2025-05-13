import { useFetcher, type ActionFunctionArgs } from 'react-router-dom';
import Button from '../../ui/Button';
import { updateOrder } from '../../services/apiRestaurant';

export default function UpdateOrder() {
  const fetcher = useFetcher();

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button>Make Priority</Button>
    </fetcher.Form>
  );
}

export async function action({ params }: ActionFunctionArgs) {
  if (params.orderId) {
    const data = { priority: true };
    await updateOrder(params.orderId, data);
  }
  return null;
}
