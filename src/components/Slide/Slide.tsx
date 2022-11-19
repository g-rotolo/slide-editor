import { useCallback } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { useSlide } from './useSlide';
import SlideSection from './SlideSection/SlideSection';
import './slide.css';
import Container from '../Container/Container';

const Slide = () => {
    console.log('S:lide');
    const {
        slideData,
        setSlideTitle,
        setSectionIcon,
        setSectionTitle,
        setSectionText,
        switchSectionPosition,
    } = useSlide();

    const onChangeTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSlideTitle(event.target.value);
        },
        [setSlideTitle]
    );

    const onDragEndHandler = (result: DropResult) => {
        // TODO: reorder our column
        console.log(result, 'DRAG END');
        const { source, destination } = result;

        if (!destination) {
            return;
        }

        if (
            source.droppableId === destination.droppableId &&
            source.index === destination.index
        ) {
            return;
        }

        switchSectionPosition(source.index, destination.index);
    };

    return (
        <div className="slide-container">
            <input
                className="big"
                type="text"
                placeholder="Insert a title here"
                value={slideData.title}
                onChange={onChangeTitle}
            ></input>
            <DragDropContext onDragEnd={onDragEndHandler}>
                <Droppable
                    droppableId={slideData.id.toString()}
                    direction="horizontal"
                >
                    {provided => (
                        <Container
                            className="sections-container"
                            innerRef={provided.innerRef}
                            droppableProvided={provided}
                        >
                            {slideData.sections.map((section, index) => (
                                <SlideSection
                                    key={section.id}
                                    section={section}
                                    setSectionIcon={setSectionIcon}
                                    setSectionTitle={setSectionTitle}
                                    setSectionText={setSectionText}
                                    sectionIndex={index}
                                />
                            ))}
                            {provided.placeholder}
                        </Container>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    );
};

export default Slide;
