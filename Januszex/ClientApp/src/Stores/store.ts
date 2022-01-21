import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { OfferState, reducer as offerReducer } from './Offer';
import { CategoryState, reducer as categoryReducer } from './Category';
import { UserState, reducer as userReducer } from './User';
import { BannedWordState, reducer as bannedWordReducer } from './BannedWord';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

export interface ApplicationState {
  offer: OfferState | undefined;
  category: CategoryState | undefined;
  user: UserState | undefined;
  bannedWord: BannedWordState | undefined;
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
  category: categoryReducer,
  user: userReducer,
  bannedWord: bannedWordReducer
});

export const store = createStore(
  rootReducer,
  composeEnhancers?.(applyMiddleware(thunk))
);
