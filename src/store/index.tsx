import { Extension } from '@uiw/react-codemirror';
import {
    PropsWithChildren,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { defaultStore } from '../constant';
import { TypeStore } from '../types';
import StoreContext from '../context/StoreContext';

type TypeStoreProvider = {
    config?: unknown;
};
export function StoreProvider(props: PropsWithChildren<TypeStoreProvider>) {
    const { children } = props;
    const [state, setState] = useState<TypeStore['state']>(defaultStore.state);
    const firstMount = useRef<boolean>(true);

    const handleChangeTheme = useCallback(
        (theme: Extension | 'light' | 'dark' | 'none' | undefined) => {
            localStorage.setItem('theme', JSON.stringify(theme));
            setState((prev) => ({ ...prev, theme }));
        },
        []
    );

    const handleChangeCode = useCallback((code: string) => {
        localStorage.setItem('code', code);
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

    useEffect(() => {
        if (firstMount.current) {
            const code = localStorage.getItem('code');
            const theme = localStorage.getItem('theme');
            if (code && theme) {
                setState((prev) => ({
                    ...prev,
                    code,
                    theme: JSON.parse(theme),
                }));
            }
            firstMount.current = false;
        }
    }, []);

    return (
        <StoreContext.Provider value={result}>{children}</StoreContext.Provider>
    );
}
