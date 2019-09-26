import React, { useState } from 'react';
import Product from './Product';
import Widget from './Widget';
import File from './File';
import Image from './Image';
import DragList from './DragList';
import { MosTheme } from '@myonlinestore/bricks';

const App = () => {
    const [showImage, setShowImage] = useState(true);

    const products = [
        { name: 'Pocket Size', image: '/pocket-size.jpeg', supply: 23 },
        { name: 'Travel Size', image: '/travel-size.jpeg', supply: 3 },
        { name: 'Grey And Hairy', image: '/grey-hairy.jpeg', supply: 10 },
        { name: 'Long And Slim', image: '/long-slim.jpeg', supply: 0 },
    ];

    return (
        <MosTheme>
            <button onClick={() => setShowImage(!showImage)}>show/hide image</button>
            <DragList>
                {products.map(product => (
                    <Product showImage={showImage} {...product} />
                ))}
            </DragList>
        </MosTheme>
    );
};

export default App;
