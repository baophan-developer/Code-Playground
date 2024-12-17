import { Select, Space } from 'antd';
import { Header } from 'antd/es/layout/layout';
import styled from 'styled-components';
import logo from '../../assets/images/logo.png';
import { Extension } from '@uiw/react-codemirror';
import { useActionsStore } from '../../hooks';
import { useRef } from 'react';

const PaneContainer = styled(Header)`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Logo = styled('img')`
    width: 35px;
    height: 35px;
`;

/**
 * This component performs the following actions:
 *  - Change the layout,
 *  - Change the theme,
 * Of the application.
 */
export default function Pane() {
    const { onChangeTheme } = useActionsStore();
    const themeStorage = useRef(localStorage.getItem('theme'));

    return (
        <PaneContainer>
            <Logo src={logo} alt="Code playground" />
            <Space>
                <Select
                    placeholder="Theme"
                    defaultValue={
                        themeStorage.current
                            ? JSON.parse(themeStorage.current)
                            : 'light'
                    }
                    options={[
                        {
                            label: 'Light',
                            value: 'light',
                        },
                        {
                            label: 'Dark',
                            value: 'dark',
                        },
                    ]}
                    onChange={(value) => {
                        onChangeTheme(
                            value as
                                | Extension
                                | 'light'
                                | 'dark'
                                | 'none'
                                | undefined
                        );
                    }}
                />
            </Space>
        </PaneContainer>
    );
}
