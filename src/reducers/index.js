import { combineReducers } from 'redux';
import ui from './ui';
import currentUser from './currentUser';
import sliderBar from './sliderbar';

const rootReducer = combineReducers({
  ui,
  currentUser,
  sliderBar,
});

export default rootReducer;