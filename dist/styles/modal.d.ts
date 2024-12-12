export declare const modalStyles = "\n    .feedback-modal {\n        position: fixed;\n        z-index: 10000;\n        right: 20px;\n        bottom: 20px;\n        width: 360px;\n        background: #2A2A2A;\n        border-radius: 16px;\n        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);\n        color: #fff;\n        opacity: 0;\n        transform: translateY(10px);\n        transition: opacity 0.2s ease, transform 0.2s ease;\n        display: none;\n    }\n\n    .feedback-modal-content {\n        padding: 20px;  \n    }\n\n    .feedback-modal-header {\n        display: flex;\n        justify-content: space-between;\n        align-items: center;\n        margin-bottom: 16px;\n    }\n\n    .feedback-modal-header h3 {\n        margin: 0;\n        font-size: 20px;\n        font-weight: 500;\n    }\n\n    .feedback-close {\n        background: none;\n        border: none;\n        color: #fff;\n        font-size: 24px;\n        cursor: pointer;\n        padding: 0;\n        opacity: 0.7;\n    }\n\n    .feedback-close:hover {\n        opacity: 1;\n    }\n\n    .feedback-types {\n        display: flex;\n        gap: 8px;\n        margin-bottom: 16px;\n    }\n\n    .feedback-type-btn {\n        flex: 1;\n        padding: 8px;\n        border: none;\n        border-radius: 8px;\n        background: rgba(255, 255, 255, 0.1);\n        color: #fff;\n        cursor: pointer;\n        transition: background-color 0.2s;\n    }\n\n    .feedback-type-btn:hover {\n        background: rgba(255, 255, 255, 0.2);\n    }\n\n    .feedback-type-btn.active {\n        background: #6E56CF;\n    }\n\n    .feedback-input {\n        width: 100%;\n        padding: 12px;\n        border: 1px solid rgba(255, 255, 255, 0.1);\n        border-radius: 8px;\n        background: rgba(255, 255, 255, 0.05);\n        color: #fff;\n        font-size: 14px;\n        margin-top: 12px;\n        margin-bottom: 12px;\n    }\n\n    .feedback-input::placeholder {\n        color: rgba(255, 255, 255, 0.5);\n    }\n\n    .feedback-textarea {\n        width: 100%;\n        padding: 12px;\n        border: 1px solid rgba(255, 255, 255, 0.1);\n        border-radius: 8px;\n        background: rgba(255, 255, 255, 0.05);\n        color: #fff;\n        font-size: 14px;\n        resize: none;\n        margin-top: 12px;\n        margin-bottom: 12px;\n    }\n\n    .feedback-textarea::placeholder {\n        color: rgba(255, 255, 255, 0.5);\n    }\n\n    .feedback-submit {\n        width: 100%;\n        padding: 12px;\n        border: none;\n        border-radius: 8px;\n        background: #6E56CF;\n        color: #fff;\n        font-size: 14px;\n        font-weight: 500;\n        cursor: pointer;\n        transition: background-color 0.2s;\n    }\n\n    .feedback-submit:hover {\n        background: #5B46B0;\n    }\n\n    .feedback-powered {\n        text-align: center;\n        font-size: 12px;\n        color: rgba(255, 255, 255, 0.5);\n        margin-top: 12px;\n    }\n\n    .feedback-error {\n        color: #ff4d4f;\n        font-size: 12px;\n        margin-bottom: 12px;\n        display: none;\n    }\n\n    .feedback-error.show {\n        display: block;\n    }\n\n    .feedback-input.error {\n        border-color: #ff4d4f;\n    }\n";
