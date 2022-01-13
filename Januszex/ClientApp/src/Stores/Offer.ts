import { Action, Reducer } from 'redux';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';
import { Api } from 'Utils/Api';
import { IOffer, IOfferForCreation } from 'Types/stores';
import { isDefined } from 'Utils/isDefined';

export interface OfferState {
  isLoading: boolean;
  offers: IOffer[];
  offer: IOffer;
}

interface SetOffersAction {
  type: typeof ActionTypes.SET_OFFERS;
  offers: IOffer[];
}

interface SetOfferAction {
  type: typeof ActionTypes.SET_OFFER;
  offer: IOffer;
}

interface SetLoadingAction {
  type: typeof ActionTypes.SET_LOADING;
  isLoading: boolean;
}

export type OfferActionTypes =
  | SetOffersAction
  | SetOfferAction
  | SetLoadingAction;

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
    },
  getOffer:
    (id: Id): AppThunkAction<OfferActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_LOADING,
        isLoading: true
      });

      if (appState && appState.offer) {
        const result = await Api.get(`api/Offer/${id}`);

        if (result.status === 200) {
          const json = await result.json();

          dispatch({
            type: ActionTypes.SET_OFFER,
            offer: json
          });
        }
      }
    },
  createOffer:
    (data: IOfferForCreation): AppThunkAction<OfferActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_LOADING,
        isLoading: true
      });

      if (appState && appState.offer) {
        return await Api.post('api/Offer', data);
      }
    }
};

const initialState: OfferState = {
  isLoading: false,
  offers: [],
  offer: {
    id: '',
    title: '',
    categories: [],
    content: '',
    created: '',
    isActive: false,
    price: 0,
    user: {
      id: ''
    },
    location: {
      street: '',
      postalCode: '',
      city: {
        name: ''
      },
      region: {
        name: ''
      }
    }
  }
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
        ...state,
        offers: action.offers,
        isLoading: false
      };
    case ActionTypes.SET_OFFER:
      return {
        ...state,
        offer: action.offer,
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
