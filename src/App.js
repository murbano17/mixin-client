import React, { Component } from "react";
import "./styles/styles.scss";
import { Switch } from "react-router-dom";
import AuthProvider from "./lib/AuthProvider";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import AnonRoute from "./components/AnonRoute";
import PrivateRoute from "./components/PrivateRoute";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Checkout from "./pages/Checkout";

class App extends Component {
  render() {
    return (
      <AuthProvider>
        <div className="container">
          <Navbar />

          <Switch>
            <AnonRoute exact path="/" component={Home} />
            <AnonRoute exact path="/signup" component={Signup} />
            <AnonRoute exact path="/login" component={Login} />
            <PrivateRoute exact path="/products" component={Products} />
            <PrivateRoute exact path="/cart" component={Cart} />
            <PrivateRoute
              exact
              path="/products/:id"
              component={ProductDetail}
            />
            <PrivateRoute exact path="/checkout" component={Checkout} />
          </Switch>
        </div>
      </AuthProvider>
    );
  }
}

export default App;
