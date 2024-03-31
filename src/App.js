import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Home from "./components/pages/Home";
import NewSales from "./components/pages/sales/NewSales";
import SalesHistory from "./components/pages/sales/SalesHistory";
import Appointment from "./components/pages/appointment/Appointment";
import ClientList from "./components/pages/clientList/ClientList";
import ProductList from "./components/pages/products/ProductList";
import PurchaseOrder from "./components/pages/products/PurchaseOrder";
import Supplier from "./components/pages/products/Supplier";
import TeamMember from "./components/pages/setting/TeamMember";
import Service from "./components/pages/setting/Service";
import Login from "./components/pages/LoginPage";
import PrivateRoute from "./components/utils/privateRoute";
import Permission from "./components/pages/permissionControl/Permission";
import ForgetPassword from "./components/pages/ForgetPassword";
import ResetPassword from "./components/pages/ResetPassword";
import Report from "./components/pages/report/Report";
import Expances from "./components/pages/expances/Expances";
import NotFound from "./components/pages/Notfound";
import CartDetails from "./components/pages/cart/CartsDetails";
import SalesHistoryDetails from "./components/pages/sales/SalesHistoryDetails";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Login />} />
        <Route path="/forget" exact element={<ForgetPassword />} />
        <Route
          path="/reset/password/:id/:token"
          exact
          element={<ResetPassword />}
        />
        <Route element={<PrivateRoute />}>
          <Route path="/board" exact element={<Dashboard />} />
          <Route path="/boards" exact element={<Home />} />
          <Route path="/sales/new/:cartId" exact element={<NewSales />} />
          <Route path="/sale" exact element={<CartDetails />} />
          <Route
            path="/sales/history/details/:histId"
            exact
            element={<SalesHistoryDetails />}
          />
          <Route path="/sales/history" exact element={<SalesHistory />} />
          <Route path="/appointment" exact element={<Appointment />} />
          <Route path="/client" exact element={<ClientList />} />
          <Route path="/permission" exact element={<Permission />} />
          <Route path="/product/list" exact element={<ProductList />} />
          <Route path="/product/order" exact element={<PurchaseOrder />} />
          <Route path="/product/supplier" exact element={<Supplier />} />
          <Route path="/team" exact element={<TeamMember />} />
          <Route path="/service" exact element={<Service />} />
          <Route path="/report/doc" exact element={<Report />} />
          <Route path="/expenses" exact element={<Expances />} />
        </Route>
        <Route path="*" exact element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
