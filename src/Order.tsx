import React, { FC } from 'react';
import Card from './Card';
import { Box, Text, IconButton, TrashIcon } from '@myonlinestore/bricks';
import styled from 'styled-components';

type PropsType = {
    id: string;
    dragging: boolean;
    method: string;
    name: string;
    total: number;
};

const Img = styled.img`
    height: 24px;
`;

const Order: FC<PropsType> = props => {
    return (
        <Card dragging={props.dragging}>
            <Box direction="column" padding={[24, 36]}>
                <Box margin={[0, 0, 12, 0]}>
                    <Text severity="info" variant="small">
                        {props.id}
                    </Text>
                </Box>
                <Box margin={[0, 0, 6, 0]}>
                    <Text variant="extraLarge">{props.name}</Text>
                </Box>
                <Box margin={[0, 0, 6, 0]}>
                    <Text severity="success">Afgerond</Text>
                </Box>
                <Box alignItems="center">
                    <Img src={`/${props.method}.png`} />
                    &nbsp;&nbsp;
                    <Text severity="info">€{props.total}</Text>
                </Box>
            </Box>
        </Card>
    );
};

export default Order;
