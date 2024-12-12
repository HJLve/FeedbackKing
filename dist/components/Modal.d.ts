import { FeedbackConfig } from "../config";
export declare class FeedbackModal {
    private element;
    private successElement;
    private config;
    private selectedType;
    constructor(config: FeedbackConfig);
    private getModalHTML;
    private createModal;
    private bindEvents;
    private hasError;
    private showError;
    private hideError;
    private handleSubmit;
    private getDeviceInfo;
    private getBrowserInfo;
    private getOSInfo;
    mount(): void;
    show(): void;
    hide(): void;
    private injectStyles;
}
