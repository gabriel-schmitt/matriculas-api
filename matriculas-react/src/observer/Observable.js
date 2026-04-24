export class Observable {
  constructor() {
    this._listeners = new Set();
  }

  subscribe(listener) {
    this._listeners.add(listener);
    return () => this._listeners.delete(listener);
  }

  notify() {
    for (const listener of this._listeners) {
      listener();
    }
  }
}
