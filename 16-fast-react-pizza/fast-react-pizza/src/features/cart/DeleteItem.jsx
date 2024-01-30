import { useDispatch } from 'react-redux';
import Button from '../../ui/Button';
import { deleteItem } from './cartSlice';

function DeleteItem({ type = 'small', pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type={`${type}`} onClick={() => dispatch(deleteItem(pizzaId))}>
      delete
    </Button>
  );
}

export default DeleteItem;
