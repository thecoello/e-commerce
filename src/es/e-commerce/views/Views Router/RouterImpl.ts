import  { app } from '../../app';
import { Router } from './Router'
import UserRouter = require('../userView');
import ProductsView = require('../productsView');

/***************
Router for Users
****************/
const RouterUser = new Router(app,UserRouter,'/').router();

/***************
Router for Products
****************/
const RouterPrducts = new Router(app,ProductsView,'/').router();


