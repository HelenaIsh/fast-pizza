import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';
import { useAppDispatch } from '../../store';

export default function DeleteItem({ pizzaId }: { pizzaId: string }) {
  const dispatch = useAppDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
