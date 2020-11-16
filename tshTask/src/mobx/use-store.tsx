import {useContext} from 'react';
import {StoreContext} from './store-provider';
import {LoggingStore} from './logging-store';

export const useStore = () => useContext(StoreContext);
