import { createContext } from 'react';
import { TypeStore } from '../types';
import { defaultStore } from '../constant';

const StoreContext = createContext<TypeStore>(defaultStore);

export default StoreContext;
