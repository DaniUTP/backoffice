export type UpdateQuestionType = {
    id: number;
    exam_type: string;
    theme: number;
    year: string;
    question: string;
    image?: string;
    comment?: string;
    image_comment?: string;
    alt_a: string;
    alt_b: string;
    alt_c: string;
    alt_d: string;
    alt_e: string;
    response: string;
    justification?: string;
    image_justification?: string;
}