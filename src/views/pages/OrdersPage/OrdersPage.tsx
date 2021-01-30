import React from "react";
import OrdersTable from "./OrdersTable";

import "./OrdersPage.scss";

export interface OrdersPageProps {}

const OrdersPage: React.FC<OrdersPageProps> = () => {
  return (
    <div className="Page OrdersPage">
      <OrdersTable />
    </div>
  );
};

export default OrdersPage;
