import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

export const setProducts = (products) => ({
  type: 'SET_PRODUCTS' as const,
  payload: products,
});

export interface ProductState {
  products: any; // Replace 'any' with the actual type of your products
}

const initialState = {
  products: {},
};

type Action = ReturnType<typeof setProducts>;

const productReducer = (state: ProductState = initialState, action: Action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        ...state,
        products: action.payload,
      };
    default:
      return state;
  }
};

const persistConfig = {
  key: 'root',
  storage,
  // Add any other configuration options here
};

const persistedReducer = persistReducer(persistConfig, productReducer);

export default persistedReducer;