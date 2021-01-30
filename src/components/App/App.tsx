import React from "react";
import Header from "views/layout/Header";
import OrdersPage from "views/pages/OrdersPage";

type AppProps = {};

const App: React.FC<AppProps> = () => {
  return (
    <div className="App">
      <Header />
      <OrdersPage />
    </div>
  );
};

export default App;
