import { Button } from 'react-bootstrap';
import useAddToCart from '../../hooks/cart/useAddToCart';
import useRemoveCartItem from '../../hooks/cart/useRemoveCartItem';

export default function CartItem({ item, idx }) {
  const { mutate: removeItemMutate } = useRemoveCartItem();
  const { mutate: addItemMutate } = useAddToCart();
  const {
    name, amount, price,
  } = item;

  const deleteItem = () => {
    removeItemMutate({ productId: item.id, amount: 1 });
  };
  const addItem = () => {
    addItemMutate({ productId: item.id, amount: 1 });
  };
  return (
    <>
      <td>{idx + 1}</td>
      <td>{name}</td>
      <td>

        <Button
          variant="danger"
          onClick={deleteItem}
        >
          -
        </Button>
        <span>
          {' '}
          {amount}
          {' '}
        </span>
        <Button
          variant="success"
          onClick={addItem}
        >
          +
        </Button>

      </td>
      <td>
        {price}
        {' '}
        $
      </td>
    </>
  );
}
