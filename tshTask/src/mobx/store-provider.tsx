import {createContext} from 'react';
import {LoggingStore} from './logging-store';
import {UserStore} from './user-store';

export interface IStore {
  loggingStore: LoggingStore;
  userStore: UserStore;
}

export const store: IStore = {
  loggingStore: new LoggingStore(),
  userStore: new UserStore(),
};

export const StoreContext = createContext<IStore>(store);
export const StoreProvider = StoreContext.Provider;
