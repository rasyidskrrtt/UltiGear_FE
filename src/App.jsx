import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import Regist from "./pages/Regist";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import EditProfile from "./pages/EditProfile";
import Product from "./pages/Product";
// import PaymentSucces from "./pages/PaymentSucces";
// import PaymentMethod from "./pages/PaymentMethod";

import Dashboard from "./pages/adminSection/Dashboard";
import CrudProduct from "./pages/adminSection/CrudProduct";
import AddProduct from "./pages/adminSection/AddProduct";
import EditProduct from "./pages/adminSection/EditProduct";
import NotFound from "./pages/NotFound";
import { getDecodeToken } from "./utilities/decodeToken";

function App() {
  const user = getDecodeToken();

  return (
    <Router>
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<HomePage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/myorders" element={<MyOrders />} />
            <Route path="/editprofile" element={<EditProfile />} />
            <Route path="/product/:productId" element={<Product />} />
            {/* <Route path="/paymentmethod" element={<PaymentMethod />} /> */}

            {/* admin routers */}
            {user?.userRole === "ADMIN" && (
              <>
                <Route path="/admin/" element={<Dashboard />} />
                <Route path="/admin/products" element={<CrudProduct />} />
                <Route path="/admin/products/create" element={<AddProduct />} />
                <Route
                  path="/admin/products/edit/:productId"
                  element={<EditProduct />}
                />
              </>
            )}
          </>
        ) : (
          <>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/regist" element={<Regist />} />
            {/* <Route path="/paymentsucces" element={<PaymentSucces />} /> */}
          </>
        )}

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
