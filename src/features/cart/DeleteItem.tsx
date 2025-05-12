import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

export default function DeleteItem({ pizzaId }: { pizzaId: string }) {
  const dispatch = useDispatch();
  return (
    <Button size="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      Delete
    </Button>
  );
}
