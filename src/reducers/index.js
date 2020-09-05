import { combineReducers } from 'redux';
import ui from './ui';
import currentUser from './currentUser';
import sliderBar from './sliderbar';
import movies from './movies';

const rootReducer = combineReducers({
  ui,
  currentUser,
  sliderBar,
  movies,
});

export default rootReducer;