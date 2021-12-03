import { Action, Reducer } from 'redux';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';
import { Api } from 'Utils/Api';
import { IOffer } from 'Types/stores';
import { isDefined } from 'Utils/isDefined';

export interface OfferState {
  isLoading: boolean;
  offers: IOffer[];
}

interface SetOffersAction {
  type: typeof ActionTypes.SET_OFFERS;
  offers: IOffer[];
}

interface SetLoadingAction {
  type: typeof ActionTypes.SET_LOADING;
  isLoading: boolean;
}

export type OfferActionTypes = SetOffersAction | SetLoadingAction;

export const actionCreators = {
  getOffers:
    ({ query }: { query: string }): AppThunkAction<OfferActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_LOADING,
        isLoading: true
      });

      if (appState && appState.offer) {
        const result = await Api.get('api/Offer', { title: query });

        if (result) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_OFFERS,
            offers: json
          });
        }
      }
    }
};

const initialState: OfferState = {
  isLoading: false,
  offers: []
};

export const reducer: Reducer<OfferState> = (
  state: OfferState | undefined,
  incomingAction: Action
): OfferState => {
  if (!isDefined(state)) {
    return initialState;
  }

  const action = incomingAction as OfferActionTypes;

  switch (action.type) {
    case ActionTypes.SET_OFFERS:
      return {
        offers: action.offers,
        isLoading: false
      };
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
  }

  return state;
};
