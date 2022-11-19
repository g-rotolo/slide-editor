import { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Select from 'react-select';
import { iconOptions } from '../../../const/icons';
import Container from '../../Container/Container';
import IconOption from '../../IconOption/IconOption';
import { SlideSectionData } from '../types';

import './slideSection.css';

interface SlideSectionProps {
    section: SlideSectionData;
    setSectionIcon: (sectionId: number, newIcon: string) => void;
    setSectionTitle: (sectionId: number, newTitle: string) => void;
    setSectionText: (sectionId: number, newText: string) => void;
    sectionIndex: number;
}

const SlideSection: React.FC<SlideSectionProps> = ({
    section,
    setSectionIcon,
    setSectionTitle,
    setSectionText,
    sectionIndex,
}) => {
    const [showIconSelect, setShowIconSelect] = useState(false);

    const showIconSelectHandler = () => {
        setShowIconSelect(!showIconSelect);
    };

    // I dislike putting any but it seems react-select is not very typescript friendly
    const iconClickHandler = useCallback(
        (newIcon: any) => {
            setSectionIcon(section.id, newIcon.icon);
            setShowIconSelect(false);
        },
        [section, setSectionIcon]
    );

    const onChangeTitle = useCallback(
        (event: React.ChangeEvent<HTMLInputElement>) => {
            setSectionTitle(section.id, event.target.value);
        },
        [section, setSectionTitle]
    );

    const onChangeText = useCallback(
        (event: React.ChangeEvent<HTMLTextAreaElement>) => {
            setSectionText(section.id, event.target.value);
        },
        [section, setSectionText]
    );

    return (
        <Draggable
            draggableId={section.id.toString()}
            index={sectionIndex}
            key={section.id}
        >
            {provided => (
                <Container
                    className="section-container"
                    draggableProvided={provided}
                    innerRef={provided.innerRef}
                >
                    {section.icon ? (
                        <span
                            className="material-icons slide-image"
                            onClick={showIconSelectHandler}
                        >
                            {section.icon}
                        </span>
                    ) : (
                        <p onClick={showIconSelectHandler}>Choose icon...</p>
                    )}

                    {showIconSelect && (
                        <Select
                            menuIsOpen={true}
                            components={{ Option: IconOption }}
                            options={iconOptions}
                            onChange={iconClickHandler}
                        />
                    )}

                    <input
                        className="big"
                        type="text"
                        placeholder="Insert text here"
                        onChange={onChangeTitle}
                        value={section.title}
                    ></input>
                    <textarea
                        className="medium"
                        placeholder="Add additional text"
                        onChange={onChangeText}
                        value={section.additionalText}
                    ></textarea>
                </Container>
            )}
        </Draggable>
    );
};

export default SlideSection;
