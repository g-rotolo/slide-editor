import { useCallback } from 'react';
import { useSlide } from './useSlide';
import SlideSection from './SlideSection/SlideSection';
import './slide.css';

const Slide = () => {
    console.log('S:lide');
    const {
        slideData,
        setSlideTitle,
        setSectionIcon,
        setSectionTitle,
        setSectionText,
    } = useSlide();

    const onChangeTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSlideTitle(event.target.value);
        },
        [setSlideTitle]
    );

    return (
        <div className="slide-container">
            <input
                className="big"
                type="text"
                placeholder="Insert a title here"
                value={slideData.title}
                onChange={onChangeTitle}
            ></input>

            <div className="sections-container">
                {slideData.sections.map(section => (
                    <SlideSection
                        key={section.id}
                        section={section}
                        setSectionIcon={setSectionIcon}
                        setSectionTitle={setSectionTitle}
                        setSectionText={setSectionText}
                    />
                ))}
            </div>
        </div>
    );
};

export default Slide;
