export interface Study {
    title: string;
    institution: string;
    modality: 'Presential' | 'Remote';
    gradeAverage?: number;
    beginYear: number;
    endYear?: number;
    description?: string;
}