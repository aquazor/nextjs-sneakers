import { useCartContext } from '@/context/cartContext';
import CartItem from './CartItem';

export default function CartItemList() {
  const { cartItems, addCartItem, removeOrDeleteCartItem, deleteCartItem } =
    useCartContext();

  return (
    <ul className="w-full flex flex-wrap gap-4 *:w-full xl:*:w-[calc(50%-1rem/2)] bg-background">
      {cartItems.map((item) => (
        <CartItem
          key={item._id}
          item={item}
          addItem={addCartItem}
          removeItem={removeOrDeleteCartItem}
          deleteItem={deleteCartItem}
        />
      ))}
    </ul>
  );
}
