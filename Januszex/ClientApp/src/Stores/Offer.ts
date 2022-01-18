import { Action, Reducer } from 'redux';
import { AppThunkAction } from './store';
import { ActionTypes } from './constants';
import { Api } from 'Utils/Api';
import { isDefined } from 'Utils/isDefined';
import { PaginationProps } from 'Types/utils';
import { IOffer, IOfferForCreation } from 'Types/stores';

export interface OfferState {
  isLoading: boolean;
  offers: IOffer[];
  offer: IOffer;
  paginationProps: PaginationProps;
}

interface SetOffersAction {
  type: typeof ActionTypes.SET_OFFERS;
  offers: IOffer[];
}

interface SetOfferAction {
  type: typeof ActionTypes.SET_OFFER;
  offer: IOffer;
}

interface SetOfferPaginationPropsAction {
  type: typeof ActionTypes.SET_OFFER_PAGINATION_PROPS;
  paginationProps: PaginationProps;
}

interface SetOfferLoadingAction {
  type: typeof ActionTypes.SET_OFFER_LOADING;
  isLoading: boolean;
}

export type OfferActionTypes =
  | SetOffersAction
  | SetOfferAction
  | SetOfferPaginationPropsAction
  | SetOfferLoadingAction;

export const actionCreators = {
  getOffers:
    ({ query }: { query: string }): AppThunkAction<OfferActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_OFFER_LOADING,
        isLoading: true
      });

      if (appState && appState.offer) {
        const result = await Api.get('api/Offer', { title: query });

        const paginationProps = JSON.parse(result.headers.get('x-pagination')!);

        await dispatch({
          type: ActionTypes.SET_OFFER_PAGINATION_PROPS,
          paginationProps
        });

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
        type: ActionTypes.SET_OFFER_LOADING,
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
  clearOffer:
    (): AppThunkAction<OfferActionTypes> => async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_OFFER_LOADING,
        isLoading: true
      });

      if (appState && appState.offer) {
        if (appState.offer.offer.id) {
          dispatch({
            type: ActionTypes.SET_OFFER,
            offer: initialOffer
          });
        }
      }
    },
  createOffer:
    (data: IOfferForCreation): AppThunkAction<OfferActionTypes> =>
    async (dispatch, getState) => {
      const appState = getState();

      await dispatch({
        type: ActionTypes.SET_OFFER_LOADING,
        isLoading: true
      });

      if (appState && appState.offer) {
        const result = await Api.post('api/Offer', data);

        if (result) {
          await dispatch({
            type: ActionTypes.SET_OFFER_LOADING,
            isLoading: false
          });

          return result;
        }
      }
    }
};

const initialOffer = {
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
};

const initialState: OfferState = {
  isLoading: false,
  offers: [],
  offer: initialOffer,
  paginationProps: {
    TotalCount: 0,
    PageSize: 12,
    CurrentPage: 1,
    TotalPages: 1,
    HasNext: false,
    HasPrevious: false
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
    case ActionTypes.SET_OFFER_LOADING:
      return {
        ...state,
        isLoading: action.isLoading
      };
    case ActionTypes.SET_OFFER_PAGINATION_PROPS:
      return {
        ...state,
        paginationProps: action.paginationProps
      };
  }

  return state;
};
