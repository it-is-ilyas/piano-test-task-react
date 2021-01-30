import React from "react";
import { useSelector } from "react-redux";
import { ordersSelector } from "store/ducks/orders";
import { OrderType } from "store/ducks/orders/types.d";

import "./OrdersTable.scss";

export interface OrdersTableProps {}

const OrdersTable: React.FC<OrdersTableProps> = () => {
  const orders: OrderType[] = useSelector(ordersSelector);
  return (
    <table className="OrdersTable">
      <thead>
        <tr className="OrdersTable__header-row">
          <th>Name</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id} className="OrdersTable__row">
            <td>{`${order.firstName} ${order.secondName}`}</td>
            <td>{`${order.deliveryOption}`}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrdersTable;
