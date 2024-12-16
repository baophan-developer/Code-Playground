import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useMemo,
    useState,
} from 'react';

type TypeStore = {
    state: {
        theme: string;
    };
    actions: {
        onChangeTheme: (theme: string) => void;
    };
};
const defaultStore: TypeStore = {
    state: {
        theme: 'theme',
    },
    actions: {
        onChangeTheme: () => null,
    },
};
const StoreContext = createContext<TypeStore>(defaultStore);

type TypeStoreProvider = {
    config?: {};
};
function StoreProvider(props: PropsWithChildren<TypeStoreProvider>) {
    const { children } = props;
    const [state, setState] = useState<TypeStore['state']>(defaultStore.state);

    const handleChangeTheme = useCallback((theme: string) => {
        setState((prev) => ({ ...prev, theme }));
    }, []);

    const result = useMemo<TypeStore>(
        () => ({
            state,
            actions: {
                onChangeTheme: handleChangeTheme,
            },
        }),
        []
    );

    return (
        <StoreContext.Provider value={result}>{children}</StoreContext.Provider>
    );
}

function useStore() {
    const result = useContext(StoreContext);
    return result.state;
}

function useActionsStore() {
    const result = useContext(StoreContext);
    return result.actions;
}

export { useStore, useActionsStore, StoreProvider };
