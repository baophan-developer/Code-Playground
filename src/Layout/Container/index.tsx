import { Layout } from 'antd';
import styled, { CSSProperties } from 'styled-components';

const Container = styled(Layout)<{
    $width?: CSSProperties['width'];
    $height?: CSSProperties['height'];
}>`
    width: ${(props) => (props.$width ? props.$width : '100vw')};
    height: ${(props) => (props.$height ? props.$height : '100vh')};
    display: flex;
    flex-direction: column;
    gap: 5px;
`;

export default Container;
