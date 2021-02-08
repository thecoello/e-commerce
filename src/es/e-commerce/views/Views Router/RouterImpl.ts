import  { app } from '../../app';
import { Router } from './Router'
import UserRouter = require('../userView');

/***************
Router for Users
****************/
const RouterUser = new Router(app,UserRouter,'/').router();

