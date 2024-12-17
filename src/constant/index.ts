import { TypeStore } from '../types';

export const defaultStore: TypeStore = {
    state: {
        theme: 'light',
        code: '// Enter your code...',
        result: '',
    },
    actions: {
        onChangeTheme: () => null,
        onChangeCode: () => null,
        onUpdateResult: () => null,
    },
};
