export interface SlideSectionData {
    id: number;
    icon: string | null;
    title: string;
    additionalText: string;
}

export interface SlideData {
    id: number;
    title: string;
    sections: SlideSectionData[];
}
