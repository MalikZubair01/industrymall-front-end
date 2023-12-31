// actions.js
export const setProducts = (products) => ({
  type: 'SET_PRODUCTS',
  payload: products,
});

export const setMenus = (menus) => ({
  type: 'SET_MENUS',
  payload: menus,
});

// reducers.js
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const initialProductState = {
  product: {},
};

const initialMenuState = {
  menus: [],
};

export type ProductState = {
  product: {
    product: {
     
    };
  }; 
};

const productReducer = (state = initialProductState, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      console.log('action prodcut', action.payload);
      return {
        ...state,
        product: action.payload,
      };
    default:
      return state;
  }
};

const menuReducer = (state = initialMenuState, action) => {
  switch (action.type) {
    case 'SET_MENUS':
      return {
        ...state,
        menus: action.payload,
      };
    default:
      return state;
  }
};

const rootReducer = combineReducers({
  product: persistReducer(
    { key: 'product', storage },
    productReducer
  ),
  menu: persistReducer(
    { key: 'menu', storage },
    menuReducer
  ),
});

export default rootReducer;
