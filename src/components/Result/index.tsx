import { Button } from 'antd';
import { useStore } from '../../store';
import { useCallback, useState } from 'react';

/**
 * This component is space to show the result of your code.
 */
export default function Result() {
    const { code } = useStore();
    const [result, setResult] = useState<string>('');

    const runCode = useCallback((code: string) => {
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
        setResult(output);
    }, []);

    return (
        <div>
            <Button onClick={() => runCode(code)}>Run Code</Button>
            <div>{result}</div>
        </div>
    );
}
