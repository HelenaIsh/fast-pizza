import { useSelector } from 'react-redux';
import type { PizzaType } from '../../types';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';
import { addItem, getPizzaQuantityById } from '../cart/cartSlice';
import DeleteItem from '../cart/DeleteItem';
import UpdateItemQuantity from '../cart/UpdateItemQuantity';
import { useAppDispatch } from '../../store';

function MenuItem({ pizza }: { pizza: PizzaType }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useAppDispatch();
  const currentQuantity = useSelector(getPizzaQuantityById(id));

  const handleAddToCart = () => {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice,
    };
    dispatch(addItem(newItem));
  };

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-stone-500 capitalize italic">
          {ingredients.join(', ')}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="tx-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="tx-sm font-medium text-stone-500 uppercase">
              Sold out
            </p>
          )}
          {currentQuantity > 0 && (
            <div className="sm:gap:8 flex items-center gap-3">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={pizza.id} />
            </div>
          )}
          {!soldOut && currentQuantity === 0 && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
