import { javascript } from '@codemirror/lang-javascript';
import ReactCodeMirror, { ViewUpdate } from '@uiw/react-codemirror';
import { Select, Space } from 'antd';
import { useCallback } from 'react';
import Container from '../../Layout/Container';
import { useActionsStore, useStore } from '../../store';

function PaneEditor() {
    return (
        <Space>
            <Select
                placeholder="Language"
                defaultValue="javascript"
                options={[{ value: 'javascript', label: 'Javascript' }]}
            />
        </Space>
    );
}

function Editor() {
    const { theme, code } = useStore();
    const { onChangeCode } = useActionsStore();

    const onChange = useCallback((value: string, _: ViewUpdate) => {
        onChangeCode(value);
    }, []);

    return (
        <ReactCodeMirror
            value={code}
            theme={theme}
            extensions={[javascript({ jsx: true })]}
            onChange={onChange}
            height="500px"
        />
    );
}

/**
 * This component is a space entering your code.
 */
export default function CodeEditor() {
    return (
        <Container $width="100%" $height="100%">
            <PaneEditor />
            <Editor />
        </Container>
    );
}
