import { Extension } from '@uiw/react-codemirror';
import { PropsWithChildren, useCallback, useMemo, useState } from 'react';
import { defaultStore } from '../constant';
import { TypeStore } from '../types';
import StoreContext from '../context/StoreContext';

type TypeStoreProvider = {
    config?: unknown;
};
export function StoreProvider(props: PropsWithChildren<TypeStoreProvider>) {
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

    const hanldeUpdateResult = useCallback((result: string) => {
        setState((prev) => ({ ...prev, result }));
    }, []);

    const result = useMemo<TypeStore>(
        () => ({
            state,
            actions: {
                onChangeTheme: handleChangeTheme,
                onChangeCode: handleChangeCode,
                onUpdateResult: hanldeUpdateResult,
            },
        }),
        [handleChangeCode, handleChangeTheme, hanldeUpdateResult, state]
    );

    return (
        <StoreContext.Provider value={result}>{children}</StoreContext.Provider>
    );
}
