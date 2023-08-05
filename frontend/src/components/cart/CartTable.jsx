import { useContext, useState, useEffect } from 'react';
import { Placeholder, Table } from 'react-bootstrap';
import { AuthContext } from '../../contexts/AuthContext';
import useGetCart from '../../hooks/cart/useGetCart';
import CartItem from './CartItem';

export default function CartTable() {
  const { auth } = useContext(AuthContext);
  const { data } = useGetCart();
  const [summary, setSummary] = useState(0);
  useEffect(() => {
    if (data && data.length >= 0 && auth.id) {
      const newSummary = data.reduce((prev, curr) => prev + curr.price * curr.amount, 0);
      setSummary(newSummary);
    }
  }, [data, auth.id]);
  return (
    <Table>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {auth.id ? (
          data?.map((el, idx) => (
            <tr key={el.id}>
              <CartItem item={el} idx={idx} />
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4">
              <Placeholder animation="glow" />
            </td>
          </tr>
        )}
      </tbody>
      <tfoot>
        <tr>
          <th>Total Amount:</th>
          <td />
          <td />
          <td>
            {auth.user && summary}
            {' '}
            {!summary ? 0 : summary}
            $
          </td>
        </tr>
      </tfoot>
    </Table>
  );
}
