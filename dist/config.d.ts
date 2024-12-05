export type FeedbackType = "issue" | "idea" | "other";
export interface FeedbackMetadata {
    device: string;
    page: string;
    [key: string]: any;
}
export interface FeedbackConfig {
    projectId: string;
    onSubmit?: (feedback: FeedbackData) => Promise<void>;
    theme?: {
        primaryColor?: string;
        textColor?: string;
        backgroundColor?: string;
    };
}
export interface FeedbackData {
    type: FeedbackType;
    title: string;
    message: string;
    metadata: FeedbackMetadata;
    timestamp: number;
}
