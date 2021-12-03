import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { OfferState, reducer as offerReducer } from './Offer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface ApplicationState {
  offer: OfferState | undefined;
}

export interface AppThunkAction<TAction> {
  (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}

const composeEnhancers =
  process.env.NODE_ENV === 'development'
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : compose;

// TODO: Add reducers
const rootReducer = combineReducers({ offer: offerReducer });

export const store = createStore(
  rootReducer,
  composeEnhancers?.(applyMiddleware(thunk))
);
