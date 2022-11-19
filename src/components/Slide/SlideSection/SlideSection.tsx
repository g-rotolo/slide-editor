import { useCallback, useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import Select from 'react-select';
import { iconOptions } from '../../../const/icons';
import IconOption from '../../IconOption/IconOption';
import { SlideSectionData } from '../types';

import './slideSection.css';

interface SlideSectionProps {
    section: SlideSectionData;
    setSectionIcon: (sectionId: number, newIcon: string) => void;
    setSectionTitle: (sectionId: number, newTitle: string) => void;
    setSectionText: (sectionId: number, newText: string) => void;
    sectionIndex: number;
    isPrinting: boolean;
}

const SlideSection: React.FC<SlideSectionProps> = ({
    section,
    setSectionIcon,
    setSectionTitle,
    setSectionText,
    sectionIndex,
    isPrinting,
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
                <div
                    className="section-container"
                    {...provided.dragHandleProps}
                    {...provided.draggableProps}
                    ref={provided.innerRef}
                    id={`section-container-${section.id}`}
                >
                    {section.icon ? (
                        <span
                            className="material-icons slide-image"
                            onClick={showIconSelectHandler}
                        >
                            {section.icon}
                        </span>
                    ) : (
                        <p
                            className="choose-icon"
                            onClick={showIconSelectHandler}
                        >
                            Choose icon...
                        </p>
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
                    {isPrinting ? (
                        <p
                            className="print-helper"
                            id={`additional-text-${section.id}`}
                        >
                            {section.additionalText}
                        </p>
                    ) : (
                        <textarea
                            id={`textarea-section-${section.id}`}
                            className="textarea-medium"
                            placeholder="Add additional text"
                            onChange={onChangeText}
                            value={section.additionalText}
                        ></textarea>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default SlideSection;
