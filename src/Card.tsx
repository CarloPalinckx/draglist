import styled from 'styled-components';

const Card = styled.div<{ dragging: boolean }>`
    transition: border-radius 300ms;
    position: relative;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    background: #fff;
    width: 100%;
`;

export default Card;
