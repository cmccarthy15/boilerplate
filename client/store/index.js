import { combineReducers,
  createStore,
  applyMiddleware
} from 'redux';
import { createLogger } from 'redux-logger';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from './reducer';


export default createStore(
  reducer,
  applyMiddleware(
    createLogger(),
    thunkMiddleware,
    composeWithDevTools
  )
);

