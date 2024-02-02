import classes from './CartButton.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { uiActions } from '../../store/ui-slice';

const CartButton = (props) => {
  const dispatch = useDispatch();
  const totalItems = useSelector(state => state.cart.totalQuantity);
  const onClickHandler = () => {
    dispatch(uiActions.toggle());
  }

  return (
    <button 
    className={classes.button}
    onClick={onClickHandler}
    >
      <span>My Cart</span>
      <span className={classes.badge}>{totalItems}</span>
    </button>
  );
};

export default CartButton;
