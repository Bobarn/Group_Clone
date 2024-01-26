import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllOrders, } from "../../redux/orders";
import "./orders.css";

function Orders() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orders);
  const user = useSelector(state => state.session.user)
  const currUser = user.id
  const orders = Object.values(allOrders);


  useEffect(() => {
    dispatch(thunkGetAllOrders());
  }, [dispatch,currUser]);

  return (
    <div className="order-page-main-cont">
      <div className="order-title-cont">
        <span>Your purchases</span>
      </div>

      <div className="orders-main-cont">
        {orders.map((order) => (
          <div key={order.id} className="full-order-cont">
            <div className='date-cont'>
                <span>{`Purchased on ${order.purchase_date.substring(0,16)}`}</span>
                <div className='order-total-cont'>
                    <span>{`$${order.total}`}</span>

                </div>
            </div>
            {order.items.map((item) => (
              <div className="order-item-cont" key={item.id}>
                <div className="order-top-cont">
                  {/* <span>{`$${item.product.price}`}</span> */}
                </div>

                <div className="order-lower-cont">
                  <img className="order-img" src={item.product.preview_image}  />
                  <div className="order-name-cont">
                    <span>{item.product.name}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
