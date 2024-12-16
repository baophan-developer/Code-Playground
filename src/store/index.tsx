import { Extension } from '@uiw/react-codemirror';
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
        theme: Extension | 'light' | 'dark' | 'none' | undefined;
        code: string;
    };
    actions: {
        onChangeTheme: (
            theme: Extension | 'light' | 'dark' | 'none' | undefined
        ) => void;
        onChangeCode: (value: string) => void;
    };
};
const defaultStore: TypeStore = {
    state: {
        theme: 'light',
        code: '// Enter your code...',
    },
    actions: {
        onChangeTheme: () => null,
        onChangeCode: () => null,
    },
};
const StoreContext = createContext<TypeStore>(defaultStore);

type TypeStoreProvider = {
    config?: {};
};
function StoreProvider(props: PropsWithChildren<TypeStoreProvider>) {
    const { children } = props;
    const [state, setState] = useState<TypeStore['state']>(defaultStore.state);

    const handleChangeTheme = useCallback(
        (theme: Extension | 'light' | 'dark' | 'none' | undefined) => {
            setState((prev) => ({ ...prev, theme }));
        },
        []
    );

    const handleChangeCode = useCallback((code: string) => {
        setState((prev) => ({ ...prev, code }));
    }, []);

    const result = useMemo<TypeStore>(
        () => ({
            state,
            actions: {
                onChangeTheme: handleChangeTheme,
                onChangeCode: handleChangeCode,
            },
        }),
        [state]
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
