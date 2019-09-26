import React, { FC } from 'react';
import { Heading, Box, Text, Icon, CubesIcon } from '@myonlinestore/bricks';
import styled from 'styled-components';

const Card = styled.div`
    position: relative;
    border-radius: 24px;
    box-shadow: 0 0 12px rgba(0, 0, 0, 0.03);
    overflow: hidden;
    background: #fff;
`;

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
        <Card>
            <Box>
                {props.showImage && (
                    <Box style={{ overflow: 'hidden' }} position="relative" width="180px" height="180px">
                        <Img src={props.image} />
                    </Box>
                )}
                <Box direction="column" width="400px" padding={[24, 48, 24, 24]}>
                    <Text severity="info">3265235</Text>
                    <Box margin={[9, 0, 0, 0]}>
                        <Text variant="extraLarge">{props.name}</Text>
                    </Box>
                    <Box margin={[0, 0, 0, 0]} direction="column">
                        <Text variant="large" strong>
                            € 22,50
                        </Text>
                        <Box margin={[6, 0, 0, 0]}>
                            <Text severity={supplyStatus}>
                                <b>{props.supply}</b> op voorraad
                            </Text>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Card>
    );
};

export default Product;
