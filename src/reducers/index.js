import { combineReducers } from 'redux';
import ui from './ui';
import currentUser from './currentUser';
import sliderBar from './sliderbar';
import movies from './movies';
import promotionReducer from './promotion';
import bookingTimeReducer from './bookingTime';
import theaterReducer from './theaters'
import branchReducer from './branchs'
import admin from "./admin";
import tickets from "./tickets";

const rootReducer = combineReducers({
  ui,
  currentUser,
  sliderBar,
  movies,
  bookingTimeReducer,
  promotionReducer,
  theaterReducer,
  branchReducer,
  admin,
  tickets,
});

export default rootReducer;