import { Button, Space } from 'antd';
import { useCallback } from 'react';
import { useActionsStore, useStore } from '../../hooks';
import Container from '../../Layout/Container';
import ReactCodeMirror from '@uiw/react-codemirror';

function Pane() {
    const { code } = useStore();
    const { onUpdateResult } = useActionsStore();

    const runCode = useCallback(
        (code: string) => {
            let output = '';
            const originalConsoleLog = console.log;
            console.log = function (message: string) {
                output +=
                    typeof message === 'object'
                        ? JSON.stringify(message) + '\n'
                        : message + '\n';
                originalConsoleLog.apply(console, arguments as any);
            };
            try {
                eval(code);
            } catch (error) {
                console.error(error);
                output += error + '\n';
            }
            // Restore original console.log
            console.log = originalConsoleLog;
            onUpdateResult(output);
        },
        [onUpdateResult]
    );

    return (
        <Space>
            <Button onClick={() => runCode(code)}>Run</Button>
        </Space>
    );
}

function ShowResult() {
    const { result, theme } = useStore();

    return <ReactCodeMirror value={result} theme={theme} readOnly />;
}

/**
 * This component is space to show the result of your code.
 */
export default function Result() {
    return (
        <Container $width="100%" $height="100%">
            <Pane />
            <ShowResult />
        </Container>
    );
}
