import { DraggableProvided, DroppableProvided } from 'react-beautiful-dnd';

interface ContainerProps {
    className: string;
    children: React.ReactNode;
    innerRef?: (element: HTMLElement | null) => void;
    droppableProvided?: DroppableProvided;
    draggableProvided?: DraggableProvided;
}

const Container: React.FC<ContainerProps> = ({
    className,
    children,
    innerRef,
    droppableProvided,
    draggableProvided,
}) => {
    if (droppableProvided) {
        return (
            <div
                className={className}
                ref={innerRef}
                {...droppableProvided.droppableProps}
            >
                {children}
            </div>
        );
    }
    if (draggableProvided) {
        return (
            <div
                className={className}
                ref={innerRef}
                {...draggableProvided.draggableProps}
                {...draggableProvided.dragHandleProps}
            >
                {children}
            </div>
        );
    }
    return null;
};

export default Container;
