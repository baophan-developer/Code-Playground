import { useContext } from 'react';
import StoreContext from '../context/StoreContext';

export function useStore() {
    const result = useContext(StoreContext);
    return result.state;
}

export function useActionsStore() {
    const result = useContext(StoreContext);
    return result.actions;
}
