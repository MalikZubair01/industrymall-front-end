import React from "react";
import { ToastContainer } from "react-toastify";
import { FilterProvider } from "../helpers/filter/filter.provider";
import { CartProvider } from "../helpers/cart/cart.provider";
import { WishlistProvider } from "../helpers/wishlist/wish.provider";
import { CurrencyContextProvider } from "../helpers/currency/CurrencyContext";
import { CompareProvider } from "../helpers/compare/compare.provider";
import { MenuContextProvider } from "../helpers/menu/MenuContext";
import { ApiDataProvider } from "helpers/data/DataContext";
import TaptoTop from "../views/Containers/TapTop";
// import Customizer from "../views/Containers/customizer";
import Loader from "../common/Loader";
import { store, persistor } from "store/store";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Styles
import "public/scss/app.scss";
import "react-toastify/dist/ReactToastify.css";

// Language translation file
import "../data/i18n";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Loader>
        <div>
          <ApiDataProvider>
            <CurrencyContextProvider>
              <MenuContextProvider>
                <CartProvider>
                  <WishlistProvider>
                    <CompareProvider>
                      <FilterProvider>
                        <Provider store={store}>
                          <PersistGate loading={null} persistor={persistor}>
                            <Component {...pageProps} />
                          </PersistGate>
                        </Provider>
                      </FilterProvider>
                    </CompareProvider>
                  </WishlistProvider>
                </CartProvider>
              </MenuContextProvider>
            </CurrencyContextProvider>
            <ToastContainer />
            <TaptoTop />
            {/* <Customizer /> */}
          </ApiDataProvider>
        </div>
      </Loader>
    </>
  );
}

export default MyApp;
