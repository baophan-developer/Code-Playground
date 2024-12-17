import { Extension } from '@uiw/react-codemirror';

export type TypeStore = {
    state: {
        theme: Extension | 'light' | 'dark' | 'none' | undefined;
        code: string;
        result: string;
    };
    actions: {
        onChangeTheme: (
            theme: Extension | 'light' | 'dark' | 'none' | undefined
        ) => void;
        onChangeCode: (value: string) => void;
        onUpdateResult: (value: string) => void;
    };
};
