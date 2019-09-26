import React, { FC, Children } from 'react';

const DragList: FC = props => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            {Children.map(props.children, child => (
                <div style={{ marginTop: '9px', marginBottom: '9px' }}>{child}</div>
            ))}
        </div>
    );
};

export default DragList;
