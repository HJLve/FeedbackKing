import { FeedbackConfig } from "./config";
declare class FeedbackKing {
    private config;
    private modal;
    constructor(config: Partial<FeedbackConfig>);
    private validateConfig;
    private init;
    private showModal;
}
export default FeedbackKing;
