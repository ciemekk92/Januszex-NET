import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { OfferState, reducer as offerReducer } from './Offer';
import { CategoryState, reducer as categoryReducer } from './Category';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface ApplicationState {
  offer: OfferState | undefined;
  category: CategoryState | undefined;
}

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

const rootReducer = combineReducers({
  offer: offerReducer,
  category: categoryReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancers?.(applyMiddleware(thunk))
);
