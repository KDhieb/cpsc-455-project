import { combineReducers } from 'redux';
import songs from './songs';

const rootReducer = combineReducers({
    reducer: songs
  });
  
export default rootReducer;