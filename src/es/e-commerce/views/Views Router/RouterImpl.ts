import  { app } from '../../app';
import { Router } from './Router'
import UserRouter = require('../userView');
import ProductsView = require('../productsView');
import purchaseView = require('../purchaseView');

/***************
Router for Users
****************/
const RouterUser = new Router(app,UserRouter,'/').router();

/***************
Router for Products
****************/
const RouterProducts = new Router(app,ProductsView,'/').router();

/***************
purchase for Products
****************/
const purchaseProducts = new Router(app,purchaseView,'/').router();




