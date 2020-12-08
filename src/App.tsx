import React from "react";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./css/style.css";
import AppRouters from "./routers/Routers";
import { ApolloProvider } from "@apollo/react-hooks";
import { client } from './apollo-graphql';
import { Provider } from 'react-redux';
import store, { persistor } from './redux/store';
import { ToastProvider } from "react-toast-notifications";
import { PersistGate } from 'redux-persist/integration/react';
import { resolverReload } from "./redux/actions/reloadActions";
import ControlProvider from "./hooks/ControlContext";
function App() {
  store.dispatch(resolverReload())
  return (
    <div className="App">
      <ControlProvider>
      <ToastProvider placement="bottom-left">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ApolloProvider client={client}>
              <AppRouters />
            </ApolloProvider>
          </PersistGate>
        </Provider>
      </ToastProvider>
      </ControlProvider>
    </div>
  );
}

export default App;
