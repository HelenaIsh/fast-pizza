import {
  Form,
  redirect,
  useActionData,
  useNavigation,
  type ActionFunctionArgs,
} from 'react-router-dom';
import { createOrder } from '../../services/apiRestaurant';
import type { CartType } from '../../types';
import Button from '../../ui/Button';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import { clearCart, getCart, getTotalCartPrice } from '../cart/cartSlice';
import EmptyCart from '../cart/EmptyCart';
import store, { useAppDispatch } from '../../store';
import { formatCurrency } from '../../utils/helpers';
import { useState } from 'react';
import { fetchAddress } from '../user/userSlice';

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str: string) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState(false);
  const navigation = useNavigation();
  const {
    username,
    status: addressStatus,
    position,
    error: errorAddress,
    address,
  } = useSelector((state: RootState) => state.user);
  const formErrors = useActionData();
  const cart = useSelector(getCart);
  const totalCartPrice = useSelector(getTotalCartPrice);
  const dispatch = useAppDispatch();

  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  const isSubmitting = navigation.state === 'submitting';
  const isLoadingAddress = addressStatus === 'loading';

  if (!cart.length) {
    return <EmptyCart />;
  }

  return (
    <div className="px-4 py-6">
      <h2 className="mb-8 text-xl font-semibold">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            type="text"
            name="customer"
            required
            className="input w-full"
            defaultValue={username}
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="w-full">
            <input type="tel" name="phone" required className="input" />
            {formErrors?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formErrors.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="sm:basis-40">Address</label>
          <div className="w-full">
            <input
              type="text"
              name="address"
              required
              className="input"
              disabled={isLoadingAddress}
              defaultValue={address}
            />
            {addressStatus === 'error' && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAddress}
              </p>
            )}
          </div>
          {!position?.latitude && !position?.longitude && (
            <span className="absolute top-[3px] right-[3px] z-50 md:top-[5px] md:right-[5px]">
              <Button
                type="small"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
                disabled={isLoadingAddress}
              >
                Get position
              </Button>
            </span>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            type="checkbox"
            name="priority"
            id="priority"
            className="h-6 w-6 accent-yellow-400 focus:ring focus:ring-yellow-400 focus:ring-offset-2 focus:outline-none"
            checked={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label className="font-medium" htmlFor="priority">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position && position.latitude && position.longitude
                ? `${position?.latitude},${position?.longitude}`
                : ''
            }
          />
          <Button disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? 'Placing order...'
              : `Order now from ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

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

export default CreateOrder;
