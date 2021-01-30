import {
  createStore,
  applyMiddleware,
  combineReducers,
  compose,
  Store,
} from "redux";
import thunkMiddleware from "redux-thunk";
import * as reducers from "./ducks";

const rootReducer = combineReducers({
  ...reducers,
});

export type RootState = ReturnType<typeof rootReducer>;

export function configureStore(initialState: Object) {
  let composeEnhancers = compose;

  // If Redux Dev Tools and Saga Dev Tools Extensions are installed, enable them
  if (process.env.NODE_ENV !== "production" && typeof window === "object") {
    if (window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"])
      composeEnhancers = window["__REDUX_DEVTOOLS_EXTENSION_COMPOSE__"]({});
  }

  const middlewares = [thunkMiddleware];

  const enhancers = [applyMiddleware(...middlewares)];

  let store: Store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers)
  );

  return { store };
}
