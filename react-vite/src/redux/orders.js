const GET_ALL_ORDERS = "reviews/getAllOrders";
const CREATE_ORDER = "reviews/makeOrder";

const getAllOrders = (orders) => {
  return {
    type: GET_ALL_ORDERS,
    orders,
  };
};

const makeOrder = (order) => {
  return {
    type: CREATE_ORDER,
    order,
  };
};

export const thunkGetAllOrders = () => async (dispatch) => {
  const response = await fetch("/api/orders/");

  if (response.ok) {
    const orders = await response.json();

    dispatch(getAllOrders(orders));

    return orders;
  }
};
// The cart argument will most likely be formatted as an array of objects with a productId and a quantity
export const thunkCreateOrder = (cart) => async (dispatch) => {
  const response = await fetch(`/api/orders/new`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });

  if (response.ok) {
    let newOrder = await response.json();
    let order_item;
    for (let item of cart) {
      order_item = await fetch(`/api/orders/item/${item.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          "order_id": newOrder.Order.id,
          "quantity": item.quantity,
        }),
      });
    }
    order_item = await order_item.json()
    dispatch(makeOrder(order_item))

    return order_item;
  } else {
    return { Error: "Could not make new order" };
  }
};

function orderReducer(state = {}, action) {
  switch (action.type) {
    case GET_ALL_ORDERS: {
      let orders = action.orders.Orders;
      let newOrders = {};

      orders.map((order) => {
        newOrders[order.id] = order;
      });

      return { ...state, ...newOrders };
    }
    case CREATE_ORDER: {
      const order = action.order.Order;
      const newState = { ...state };
      newState[order.id] = order;
      return newState;
    }
    default:
      return state;
  }
}

export default orderReducer;
