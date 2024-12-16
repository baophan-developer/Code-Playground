import { Splitter } from 'antd';
import CodeEditor from '../CodeEditor';
import Result from '../Result';
import styled from 'styled-components';

const SplitterContainer = styled(Splitter)`
    padding: 10px 50px;
`;

/**
 * This component is a space for the Code Editor and Result.
 */
export default function Playground() {
    return (
        <SplitterContainer>
            <Splitter.Panel collapsible>
                <CodeEditor />
            </Splitter.Panel>
            <Splitter.Panel collapsible>
                <Result />
            </Splitter.Panel>
        </SplitterContainer>
    );
}
