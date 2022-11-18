import { useCallback, useState } from 'react';
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
}

const SlideSection: React.FC<SlideSectionProps> = ({
    section,
    setSectionIcon,
    setSectionTitle,
    setSectionText,
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
        <div className="section-container" id={section.id.toString()}>
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
        </div>
    );
};

export default SlideSection;
