import { useCallback, useEffect, useState } from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import JsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { useSlide } from './useSlide';
import SlideSection from './SlideSection/SlideSection';
import './slide.css';

const Slide = () => {
    const {
        slideData,
        setSlideTitle,
        setSectionIcon,
        setSectionTitle,
        setSectionText,
        switchSectionPosition,
    } = useSlide();

    const [isPrinting, setIsPrinting] = useState(false);

    const onChangeTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSlideTitle(event.target.value);
        },
        [setSlideTitle]
    );

    const onDragEndHandler = (result: DropResult) => {
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

    useEffect(() => {
        if (isPrinting) {
            generatePDF();
        }
    }, [isPrinting]);

    const generatePDF = async () => {
        const slideElement: HTMLElement | null =
            document.querySelector('.slide-container');

        const pdf = new JsPDF('landscape', 'px', 'a4');

        if (slideElement) {
            const canvas = await html2canvas(slideElement);
            const data = canvas.toDataURL('image/png');

            const imgProperties = pdf.getImageProperties(data);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight =
                (imgProperties.height * pdfWidth) / imgProperties.width;

            pdf.addImage(data, 'PNG', 0, 0, pdfWidth, pdfHeight);
            pdf.save('print.pdf');
            setIsPrinting(false);
        }
    };

    return (
        <>
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
                            <div
                                className="sections-container"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {slideData.sections.map((section, index) => (
                                    <SlideSection
                                        key={section.id}
                                        section={section}
                                        setSectionIcon={setSectionIcon}
                                        setSectionTitle={setSectionTitle}
                                        setSectionText={setSectionText}
                                        sectionIndex={index}
                                        isPrinting={isPrinting}
                                    />
                                ))}
                                {provided.placeholder}
                            </div>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
            <div className="button-container">
                <button onClick={() => setIsPrinting(true)}>Save to PDF</button>
            </div>
        </>
    );
};

export default Slide;
