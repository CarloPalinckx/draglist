import React, { useState } from 'react';
import Product from './Product';
import Order from './Order';
import DragList from './DragList';
import { MosTheme, Box } from '@myonlinestore/bricks';
import move from 'array-move';

const App = () => {
    const [showImage, setShowImage] = useState(true);
    const [dragMode, setDragMode] = useState(false);
    const [show, setShow] = useState<'products' | 'orders' | ''>('');

    const [products, setProducts] = useState([
        { name: 'Pocket Size', image: '/pocket-size.jpeg', supply: 23, dragging: false },
        { name: 'Travel Size', image: '/travel-size.jpeg', supply: 3, dragging: false },
        { name: 'Grey And Hairy', image: '/grey-hairy.jpeg', supply: 10, dragging: false },
        { name: 'Long And Slim', image: '/long-slim.jpeg', supply: 0, dragging: false },
    ]);

    const [orders, setOrders] = useState([
        { name: 'Freek Biers', id: '124522', dragging: false, method: 'ideal', total: 12.34 },
        { name: 'John de Wilde', id: '232452', dragging: false, method: 'mastercard', total: 23.99 },
        { name: 'Kim Nguyen', id: '7647623', dragging: false, method: 'alipay', total: 14.5 },
        { name: 'Arjen Geerts', id: '9867933', dragging: false, method: 'klarna', total: 99.88 },
        {
            name: 'Sebastiaan Nimweeghen',
            id: '2ldfnkbvdklfbn2',
            dragging: false,
            method: 'klarna',
            total: 124.23,
        },
        { name: 'Bob Brechtjes', id: '12434534', dragging: false, method: 'mastercard', total: 44.54 },
        { name: "Salem M'Boto", id: '0skhbv976786r', dragging: false, method: 'ideal', total: 78.3 },
    ]);

    return (
        <MosTheme>
            <Box margin={[0, 0, 48, 0]}>
                <select onChange={value => setShow(value.target.value as any)}>
                    <option label="" value="" />
                    <option label="Products" value="products" />
                    <option label="Orders" value="orders" />
                </select>
                <button onClick={() => setShowImage(!showImage)}>show/hide image</button>
                <button onClick={() => setDragMode(!dragMode)}>{(dragMode && 'disable') || 'enable'} dragmode</button>
            </Box>
            <Box width="100%" justifyContent="center" padding={[48]}>
                {show === 'products' && (
                    <Box margin={[0, 48, 0, 0]} direction="column" alignItems="flex-start">
                        <DragList
                            enable={dragMode}
                            onDragStart={dragIndex =>
                                setProducts(
                                    products.map((product, index) => ({
                                        ...product,
                                        dragging: index === dragIndex,
                                    })),
                                )
                            }
                            onDragEnd={() =>
                                setProducts(products.map((product, index) => ({ ...product, dragging: false })))
                            }
                            onReOrder={(origin, destination) => setProducts(move(products, origin, destination))}
                        >
                            {products.map(product => (
                                <Product
                                    dragging={product.dragging}
                                    key={product.name}
                                    showImage={showImage}
                                    {...product}
                                />
                            ))}
                        </DragList>
                    </Box>
                )}
                {show === 'orders' && (
                    <Box justifyContent="center">
                        <DragList
                            enable={dragMode}
                            onDragStart={dragIndex =>
                                setOrders(
                                    orders.map((product, index) => ({ ...product, dragging: index === dragIndex })),
                                )
                            }
                            onDragEnd={() =>
                                setOrders(orders.map((product, index) => ({ ...product, dragging: false })))
                            }
                            onReOrder={(origin, destination) => setOrders(move(orders, origin, destination))}
                        >
                            {orders.map(order => (
                                <Order key={order.id} {...order} />
                            ))}
                        </DragList>
                    </Box>
                )}
            </Box>
        </MosTheme>
    );
};

export default App;
