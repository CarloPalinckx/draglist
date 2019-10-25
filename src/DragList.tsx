import React, { FC, Children, useState, useRef, useEffect } from 'react';
import { motion, useMotionValue, MotionProps, useAnimation } from 'framer-motion';
import { Position, findIndex } from './find-index';
import styled from 'styled-components';

type DragItemPropsType = {
    index: number;
    enable: boolean;
    setPosition(index: number, position: Position): void;
    moveItem(origin: number, desitination: number): void;
    onDragStart(): void;
    onDragEnd(): void;
};

const onTop = {
    zIndex: 1,
};

const flat = {
    zIndex: 0,
    transition: { delay: 0.3 },
};

const floating = {
    boxShadow: '10px 10px 10px rgba(0,0,0,0)',
};

const DragItemContainer = styled(motion.div)`
    margin-bottom: 24px;
`;

const DragItem: FC<DragItemPropsType> = props => {
    const [isDragging, setDragging] = useState(false);
    const ref = useRef<HTMLDivElement | null>(null);
    const dragOriginY = useMotionValue(0);
    const controls = useAnimation();

    useEffect(() => {
        if (ref.current !== null) {
            props.setPosition(props.index, {
                height: ref.current.offsetHeight,
                top: ref.current.offsetTop,
            });
        }
    });

    useEffect(() => {
        if (props.enable !== false && !isDragging) {
            controls.start({
                rotateZ: [-1, 1],
                transition: {
                    yoyo: Infinity,
                    delay: 0.1 * props.index,
                    duration: 0.2,
                },
                transitionEnd: {
                    rotateZ: 0,
                },
            });
        }

        if (!props.enable) {
            controls.stop();
            controls.set({
                rotateZ: 0,
                transition: {
                    duration: 1,
                },
            });
        }

        if (isDragging) {
            controls.stop();
            controls.set({
                rotateZ: 0,
                transition: {
                    duration: 1,
                },
            });
        }
    }, [props.enable, isDragging]);

    const dragProps: MotionProps =
        props.enable !== false
            ? {
                  style: { cursor: isDragging ? 'grabbing' : 'grab', zIndex: isDragging ? 1 : 0 },
                  whileHover: { scale: 1.03 },
                  whileTap: { scale: 1.12 },
                  drag: 'y',
                  dragOriginY: dragOriginY,
                  dragConstraints: { top: 0, bottom: 0 },
                  dragElastic: 1,
                  onDragStart: () => {
                      setDragging(true);
                      props.onDragStart();
                  },
                  onDragEnd: () => {
                      setDragging(false);
                      props.onDragEnd();
                  },
                  onDrag: (_, { point }) => props.moveItem(props.index, point.y),
                  positionTransition: ({ delta }) => {
                      if (isDragging) {
                          // If we're dragging, we want to "undo" the items movement within the list
                          // by manipulating its dragOriginY. This will keep the item under the cursor,
                          // even though it's jumping around the DOM.
                          dragOriginY.set(dragOriginY.get() + delta.y);
                      }

                      // If `positionTransition` is a function and returns `false`, it's telling
                      // Motion not to animate from its old position into its new one. If we're
                      // dragging, we don't want any animation to occur.
                      return !isDragging;
                  },
              }
            : {};

    return (
        <DragItemContainer ref={ref} animate={controls} {...dragProps}>
            {props.children}
        </DragItemContainer>
    );
};

type DragListPropsType = {
    enable?: boolean;
    onDragStart(dragIndex: number): void;
    onDragEnd(dragIndex: number): void;
    onReOrder(origin: number, desitination: number): void;
};

const DragList: FC<DragListPropsType> = props => {
    const positions = useRef<Array<Position>>([]).current;
    const setPosition = (index: number, offset: Position) => (positions[index] = offset);

    const moveItem = (index: number, dragOffset: number) => {
        const targetIndex = findIndex(index, dragOffset, positions);

        if (targetIndex !== index) {
            props.onReOrder(index, targetIndex);
        }
    };

    return (
        <div style={{ display: 'flex', flexDirection: 'column' }}>
            {Children.map(props.children, (child, index) => (
                <DragItem
                    enable={props.enable !== false}
                    onDragStart={() => props.onDragStart(index)}
                    onDragEnd={() => props.onDragEnd(index)}
                    index={index}
                    setPosition={setPosition}
                    moveItem={moveItem}
                >
                    {child}
                </DragItem>
            ))}
        </div>
    );
};

export default DragList;
