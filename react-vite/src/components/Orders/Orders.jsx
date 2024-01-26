import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { thunkGetAllOrders } from "../../redux/orders";
import "./orders.css";

function Orders() {
  const dispatch = useDispatch();
  const allOrders = useSelector((state) => state.orders);
  const orders = Object.values(allOrders);

  console.log("ORDERS", orders);
  useEffect(() => {
    dispatch(thunkGetAllOrders());
  }, [dispatch]);

  return (
    <div className="order-page-main-cont">
        <span>Your purchases</span>

      <div className="orders-main-cont">
        <div className="order-cont">
          {orders.map((order) => (
            <div key={order.id}>
              {order.items.map((item) => (
                <div className="order-item-cont" key={item.id}>
                  <div className="order-top-cont">
                    <span>{`Purchased from ${
                      item.product.seller.first_name
                    } on ${order.purchase_date
                      .split(" ")
                      .slice(0, 4)
                      .join(" ")}`}</span>
                    <span>{`$${item.product.price}`}</span>
                  </div>

                  <div className="order-lower-cont">
                    <img
                      className="order-img"
                      src={item.product.preview_image}
                    />
                    <div className='order-name-cont'>
                    <span>{item.product.name}</span>
                    {/* <button>Add your review</button> */}

                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Orders;
