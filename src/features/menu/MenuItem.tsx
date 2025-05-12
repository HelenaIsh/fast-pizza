import type { PizzaType } from '../../types';
import Button from '../../ui/Button';
import { formatCurrency } from '../../utils/helpers';

function MenuItem({ pizza }: { pizza: PizzaType }) {
  const { name, unitPrice, ingredients, soldOut, imageUrl } = pizza;

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
          <Button size="small">Add to cart</Button>
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
