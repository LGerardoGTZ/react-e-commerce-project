import About from './AboutPage';
import Home from './HomePage';
import Products from './ProductsPage';
import Cart from './CartPage';
import SingleProduct from './SingleProductPage';
import Error from './ErrorPage';
import Checkout from './CheckoutPage';
import PrivateRoute from './PrivateRoute';

export {
  About,
  Home,
  Products,
  Cart,
  SingleProduct,
  Error,
  Checkout,
  PrivateRoute
}

/*
To work with a better setup and avoid several lines of imports in our
app component, it's a better approach to do all of those imports in every index js file
as always is our entry point, and after that you can call them in the folder
you are working in
*/