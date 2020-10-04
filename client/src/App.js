import React from 'react';
//bootstrap imports
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.js';
//app.css import
import './App.css';
//components- layouts import
import Navbar from './components/layout/Navbar';
import NoPageFound from './components/layout/NoPageFound';
//components- pages import
import Login from './components/pages/Login';
import Home from './components/pages/Home';
import RegisterUser from './components/pages/RegisterUser';
import About from './components/pages/About';
import User from './components/pages/User';
import Wishlist from './components/pages/Wishlist';
import Profile from './components/pages/Profile';
import ProductCategory from './components/pages/ProductCategory';

//components -admin pages
import AdminHome from './components/admin/pages/AdminHome';
import ViewFurniture from './components/admin/pages/ViewFurniture';
import ViewMobile from './components/admin/pages/ViewMobile';
import Feedback from './components/admin/pages/Feedback';
import AdminUsers from './components/admin/pages/AdminUsers';
// import ViewItems from './components/admin/pages/ViewItems';

//import Utils setToken
import setToken from './utils/setToken';
// import deleteToken from './utils/deleteToken';

//components- products import
import Product from './components/products/Product';

//components - search import
import SearchModal from './components/search/SearchModal';
import SearchPage from './components/search/SearchPage';

//routers import
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

//import of states
//AuthState
import AuthState from './context/auth/AuthState';

//AlertState
import AlertState from './context/alert/AlertState';

//FeedbackState
import FeedbackState from './context/feedback/FeedbackState';

///UserState
import UserState from './context/user/UserState';

//CategoryState
import CategoryState from './context/category/CategoryState';

//ProductState
import FurnitureState from './context/furniture/FurnitureState'; //FurnitureState
import VehicleState from './context/vehicle/VehicleState'; //VehicleState
import MobileState from './context/mobile/MobileState'; //MobileState
import ComputerState from './context/computer/ComputerState'; //ComputerState

//Routes
import PublicOnlyRoute from './components/routing/PublicOnlyRoute';
import LoggedInRoute from './components/routing/LoggedInRoute';
import AdminRoute from './components/routing/AdminRoute';

//Product addition forms
import AddFurniture from './components/product-forms/furniture/AddFurniture';
import AddVehicle from './components/product-forms/vehicle/AddVehicle';
import AddMobile from './components/product-forms/mobile/AddMobile';
import AddComputer from './components/product-forms/computer-and-laptops/AddComputer';

//individual state of product page 
import ProductState from './context/product/ProductState';

//import of wishlist state
import WishlistState from './context/wishlist/WishlistState';
import ViewComputer from './components/admin/pages/ViewComputer';
import ViewVehicle from './components/admin/pages/ViewVehicle';
import ChatHomePage from './components/pages/ChatHomePage';


if (localStorage.token) {
  setToken(localStorage.token);
}

function App() {
  return (
    <AlertState>
      <AuthState>
        <FeedbackState>
          <UserState>
            <CategoryState>
              <FurnitureState>
                <VehicleState>
                  <MobileState>
                    <ComputerState>
                      <ProductState>
                        <WishlistState>
                          <Router>
                            <Navbar />
                            <SearchModal />
                            <Switch>
                              <Route exact path='/' component={Home} />
                              <PublicOnlyRoute exact path='/login' component={Login} />
                              <PublicOnlyRoute exact path='/register' component={RegisterUser} />
                              <Route exact path='/about' component={About} />
                              <Route exact path='/product/:productId' component={Product} />
                              <Route exact path='/user/:userId' component={User} />
                              <LoggedInRoute exact path='/profile' component={Profile} />
                              <LoggedInRoute exact path='/editProfile' component={RegisterUser} />
                              <LoggedInRoute exact path='/wishlist' component={Wishlist} />
                              <Route exact path='/search' component={SearchPage} />
                              <Route exact path='/category/items' component={ProductCategory} />
                              <LoggedInRoute exact path='/addProduct/furniture' component={AddFurniture} />
                              <LoggedInRoute exact path='/addProduct/vehicle' component={AddVehicle} />
                              <LoggedInRoute exact path='/addProduct/mobile' component={AddMobile} />
                              <LoggedInRoute exact path='/addProduct/computer' component={AddComputer} />
                              <LoggedInRoute exact path='/editProduct/furniture/:id' component={AddFurniture} />
                              <LoggedInRoute exact path='/editProduct/mobile/:id' component={AddMobile} />
                              <LoggedInRoute exact path='/editProduct/vehicle/:id' component={AddVehicle} />
                              <LoggedInRoute exact path='/editProduct/computer/:id' component={AddComputer} />
                              <LoggedInRoute exact path='/chat' component={ChatHomePage} />
                              <AdminRoute exact path="/admin/home" component={AdminHome} />
                              <AdminRoute exact path="/admin/view-furniture" component={ViewFurniture} />
                              <AdminRoute exact path="/admin/view-mobile" component={ViewMobile} />
                              <AdminRoute exact path="/admin/view-computer" component={ViewComputer} />
                              <AdminRoute exact path="/admin/view-vehicle" component={ViewVehicle} />
                              <AdminRoute exact path="/admin/feedback" component={Feedback} />
                              <AdminRoute exact path="/admin/users" component={AdminUsers} />
                              <Route component={NoPageFound} />
                            </Switch>
                          </Router>
                        </WishlistState>
                      </ProductState>
                    </ComputerState>
                  </MobileState>
                </VehicleState>
              </FurnitureState>
            </CategoryState>
          </UserState>
        </FeedbackState>
      </AuthState>
    </AlertState>
  )
}
export default App;
