import { useCallback, useState } from 'react';
import { SlideData } from './types';

const defaultSlideData: SlideData = {
    id: 123,
    title: '',
    sections: [
        {
            id: 1,
            icon: null,
            title: '',
            additionalText: '',
        },
        {
            id: 2,
            icon: null,
            title: '',
            additionalText: '',
        },
        {
            id: 3,
            icon: null,
            title: '',
            additionalText: '',
        },
    ],
};

export const useSlide = () => {
    const [slideData, setSlideData] = useState<SlideData>(defaultSlideData);

    const setSlideTitle = useCallback(
        (newTitle: string) => {
            setSlideData({ ...slideData, title: newTitle });
        },
        [slideData]
    );

    const setSectionIcon = useCallback(
        (sectionId: number, newIcon: string) => {
            const sectionIndex = slideData.sections.findIndex(
                section => section.id === sectionId
            );
            const sections = [...slideData.sections];
            sections[sectionIndex].icon = newIcon;

            setSlideData({ ...slideData, sections: [...sections] });
        },
        [slideData]
    );

    const setSectionTitle = useCallback(
        (sectionId: number, newTitle: string) => {
            const sectionIndex = slideData.sections.findIndex(
                section => section.id === sectionId
            );
            const sections = [...slideData.sections];
            sections[sectionIndex].title = newTitle;

            setSlideData({ ...slideData, sections: [...sections] });
        },
        [slideData]
    );

    const setSectionText = useCallback(
        (sectionId: number, newText: string) => {
            const sectionIndex = slideData.sections.findIndex(
                section => section.id === sectionId
            );
            const sections = [...slideData.sections];
            sections[sectionIndex].additionalText = newText;

            setSlideData({ ...slideData, sections: [...sections] });
        },
        [slideData]
    );

    return {
        slideData,
        setSlideTitle,
        setSectionIcon,
        setSectionTitle,
        setSectionText,
    };
};
