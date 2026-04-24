import { Observable } from "./Observable";

export function createObservableState(initial) {
  let state =
    typeof initial === "object" && initial !== null ? { ...initial } : initial;
  const observable = new Observable();

  return {
    getState: () => state,
    setState(partial) {
      state = { ...state, ...partial };
      observable.notify();
    },
    subscribe: (listener) => observable.subscribe(listener),
  };
}
