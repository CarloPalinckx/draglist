import React, { FC } from 'react';
import { Box, Text, IconButton, GearIcon, TrashIcon, Contrast, ButtonGroup } from '@myonlinestore/bricks';
import styled from 'styled-components';
import Card from './Card';

const Img = styled.img`
    transform: translate(-50%, -50%);
    position: absolute;
    top: 50%;
    left: 50%;
    max-height: 150%;
    max-width: 150%;
`;

type PropsType = {
    image: string;
    name: string;
    supply: number;
    showImage: boolean;
    dragging: boolean;
};

const Product: FC<PropsType> = props => {
    let supplyStatus: 'success' | 'warning' | 'error' = 'success';

    if (props.supply < 10) {
        supplyStatus = 'warning';
    }

    if (props.supply === 0) {
        supplyStatus = 'error';
    }

    return (
        <Card dragging={props.dragging}>
            <Box width="100%" alignItems="center">
                {props.showImage && (
                    <Box
                        margin={[24, 0, 24, 24]}
                        style={{ borderRadius: '9px', overflow: 'hidden', transition: 'width 300ms, height 300ms' }}
                        position="relative"
                        width="90px"
                        height="90px"
                    >
                        <Img src={props.image} />
                    </Box>
                )}
                <Box style={{ overflow: 'hidden' }}>
                    <Box padding={[6, 36, 6, 24]} direction="column">
                        <Text variant="small" severity="info">
                            3265235
                        </Text>
                        <Box margin={[6, 0, 0, 0]}>
                            <Text variant="extraLarge">{props.name}</Text>
                        </Box>
                        <Box margin={[0, 0, 0, 0]}>
                            <Text severity={supplyStatus}>
                                <Text strong as="span" severity={supplyStatus}>
                                    {props.supply}
                                </Text>
                                &nbsp;op voorraad
                            </Text>
                            &nbsp; &nbsp;
                            <Text severity="info">€ 22,50</Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default Product;
