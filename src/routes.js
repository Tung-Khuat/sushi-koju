import React from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import SushiMenuIndex from './components/sushi-menu-list/sushi-menu-index';
import AuthorizedStaffLoginIndex from './components/staff-member-components/authorized-staff-login-index';
import LoginIndex from './components/account_login/login-index';
import SushiPresetFullInfoIndex from './components/sushi_preset_full_info/sushi-preset-full-info-index';
import SushiPresetIndex from './components/sushi_preset_list/sushi-preset-index';
import CartCheckoutIndex from './components/cart_checkout/cart-checkout-index';

export default function AppRouter() {
  return (
    <Router>
      <Route exact path="/" component={SushiPresetIndex} />
      <Route path="/staff" component={AuthorizedStaffLoginIndex} />
      <Route path="/login" component={LoginIndex} />
      <Route path="/platterit" component={SushiPresetIndex} />
      <Route path="/product/:id" component={SushiPresetFullInfoIndex} />
      <Route path="/kassa" component={CartCheckoutIndex} />
    </Router>
  );
}
