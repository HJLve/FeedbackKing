(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.FeedbackKing = factory());
})(this, (function () { 'use strict';

    function createElement(tag, options = {}) {
        const element = document.createElement(tag);
        // 添加类名
        if (options.className) {
            element.className = options.className;
        }
        // 设置 innerHTML
        if (options.innerHTML) {
            element.innerHTML = options.innerHTML;
        }
        // 添加属性
        if (options.attributes) {
            Object.entries(options.attributes).forEach(([key, value]) => {
                element.setAttribute(key, value);
            });
        }
        // 添加样式
        if (options.styles) {
            Object.assign(element.style, options.styles);
        }
        return element;
    }

    const modalStyles = `
    .feedback-modal {
        position: fixed;
        z-index: 10000;
        right: 20px;
        bottom: 20px;
        width: 360px;
        background: #2A2A2A;
        border-radius: 16px;
        box-shadow: 0 4px 24px rgba(0, 0, 0, 0.2);
        color: #fff;
        opacity: 0;
        transform: translateY(10px);
        transition: opacity 0.2s ease, transform 0.2s ease;
        display: none;
    }

    .feedback-modal-content {
        padding: 20px;  
    }

    .feedback-modal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 16px;
    }

    .feedback-modal-header h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
    }

    .feedback-close {
        background: none;
        border: none;
        color: #fff;
        font-size: 24px;
        cursor: pointer;
        padding: 0;
        opacity: 0.7;
    }

    .feedback-close:hover {
        opacity: 1;
    }

    .feedback-types {
        display: flex;
        gap: 8px;
        margin-bottom: 16px;
    }

    .feedback-type-btn {
        flex: 1;
        padding: 8px;
        border: none;
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.1);
        color: #fff;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .feedback-type-btn:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    .feedback-type-btn.active {
        background: #6E56CF;
    }

    .feedback-input {
        width: 294px;
        padding: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .feedback-input::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    .feedback-textarea {
        width: 294px;
        padding: 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.05);
        color: #fff;
        font-size: 14px;
        resize: none;
        margin-top: 12px;
        margin-bottom: 12px;
    }

    .feedback-textarea::placeholder {
        color: rgba(255, 255, 255, 0.5);
    }

    .feedback-submit {
        width: 100%;
        padding: 12px;
        border: none;
        border-radius: 8px;
        background: #6E56CF;
        color: #fff;
        font-size: 14px;
        font-weight: 500;
        cursor: pointer;
        transition: background-color 0.2s;
    }

    .feedback-submit:hover {
        background: #5B46B0;
    }

    .feedback-powered {
        text-align: center;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        margin-top: 12px;
    }

    .feedback-error {
        color: #ff4d4f;
        font-size: 12px;
        margin-bottom: 12px;
        display: none;
    }

    .feedback-error.show {
        display: block;
    }

    .feedback-input.error {
        border-color: #ff4d4f;
    }
`;

    const successStyles = `
    .feedback-success {
        text-align: center;
        padding: 40px 20px;
    }

    .feedback-checkmark {
        font-size: 48px;
        color: #6E56CF;
        margin-bottom: 16px;
    }

    .feedback-success h3 {
        margin: 0;
        font-size: 20px;
        font-weight: 500;
        margin-bottom: 16px;
    }
`;

    class FeedbackModal {
        constructor(config) {
            this.selectedType = "issue";
            this.config = config;
            this.injectStyles();
            this.element = this.createModal();
            this.bindEvents();
        }
        getModalHTML() {
            return `
      <div class="feedback-modal-header">
        <h3>Feedback some questions</h3>
        <button class="feedback-close">&times;</button>
      </div>
      <div class="feedback-modal-body">
        <div class="feedback-types">
          <button class="feedback-type-btn" data-type="issue">
            ❗ Issue
          </button>
          <button class="feedback-type-btn active" data-type="idea">
            💡 Idea
          </button>
          <button class="feedback-type-btn" data-type="other">
            💭 Other
          </button>
        </div>
        <div class="feedback-form">
          <div>Short title</div>
          <input type="text" class="feedback-input feedback-title" placeholder="The text is wrong" />
          <div class="feedback-error" data-error="title">Please enter a title</div>
          <div>Description</div>
          <textarea
            class="feedback-textarea" 
            placeholder="I want to say..."
            rows="4"
          ></textarea>
          <button class="feedback-submit">Send</button>
        </div>
        <div class="feedback-powered">
          Powered by HJ
        </div>
      </div>
    `;
        }
        createModal() {
            const modal = createElement("div", {
                className: "feedback-modal",
                innerHTML: `
        <div class="feedback-modal-content">
        ${this.getModalHTML()}
        </div>
      `,
            });
            modal.style.display = "none";
            return modal;
        }
        bindEvents() {
            // 关闭按钮
            const closeBtn = this.element.querySelector(".feedback-close");
            closeBtn === null || closeBtn === void 0 ? void 0 : closeBtn.addEventListener("click", () => this.hide());
            // 类型切换
            const typeButtons = this.element.querySelectorAll(".feedback-type-btn");
            typeButtons.forEach((btn) => {
                btn.addEventListener("click", (e) => {
                    const target = e.target;
                    const type = target.dataset.type;
                    if (type) {
                        this.selectedType = type;
                        typeButtons.forEach((b) => b.classList.remove("active"));
                        target.classList.add("active");
                    }
                });
            });
            // 监听标题输入
            const titleInput = this.element.querySelector(".feedback-input");
            titleInput === null || titleInput === void 0 ? void 0 : titleInput.addEventListener("input", (e) => {
                const target = e.target;
                if (target.value.trim() && this.hasError("title")) {
                    this.hideError("title");
                }
            });
            // 提交按钮
            const submitBtn = this.element.querySelector(".feedback-submit");
            submitBtn === null || submitBtn === void 0 ? void 0 : submitBtn.addEventListener("click", () => this.handleSubmit());
        }
        hasError(field) {
            const errorElement = this.element.querySelector(`[data-error="${field}"]`);
            return (errorElement === null || errorElement === void 0 ? void 0 : errorElement.classList.contains("show")) || false;
        }
        showError(field) {
            const errorElement = this.element.querySelector(`[data-error="${field}"]`);
            const inputElement = this.element.querySelector(`.feedback-${field}`);
            if (errorElement && inputElement) {
                errorElement.classList.add("show");
                inputElement.classList.add("error");
            }
        }
        hideError(field) {
            const errorElement = this.element.querySelector(`[data-error="${field}"]`);
            const inputElement = this.element.querySelector(`.feedback-${field}`);
            if (errorElement && inputElement) {
                errorElement.classList.remove("show");
                inputElement.classList.remove("error");
            }
        }
        async handleSubmit() {
            var _a, _b;
            const submitBtn = this.element.querySelector(".feedback-submit");
            submitBtn.disabled = true;
            submitBtn.textContent = "Submitting...";
            const titleInput = this.element.querySelector(".feedback-input");
            const titleValue = titleInput.value.trim();
            const textarea = this.element.querySelector(".feedback-textarea");
            const message = textarea.value.trim();
            if (!titleValue) {
                this.showError("title");
                return;
            }
            const deviceInfo = this.getDeviceInfo();
            const pageInfo = window.location.href;
            const feedback = {
                type: this.selectedType,
                title: titleValue,
                message,
                metadata: {
                    device: deviceInfo,
                    page: pageInfo,
                },
                timestamp: Date.now(),
            };
            try {
                await ((_b = (_a = this.config).onSubmit) === null || _b === void 0 ? void 0 : _b.call(_a, feedback));
                const modalContent = this.element.querySelector(".feedback-modal-content");
                if (modalContent) {
                    modalContent.innerHTML = `
        <div class="feedback-success">
          <div class="feedback-checkmark">✓</div>
          <h3>Thanks for your feedback!</h3>
        </div>
      `;
                }
                setTimeout(() => {
                    this.hide();
                    if (modalContent) {
                        modalContent.innerHTML = this.getModalHTML();
                        this.bindEvents();
                    }
                    titleInput.value = "";
                    textarea.value = "";
                }, 2000);
            }
            catch (error) {
                console.error("Failed to submit feedback:", error);
            }
            finally {
                submitBtn.disabled = false;
                submitBtn.textContent = "Send";
            }
        }
        getDeviceInfo() {
            const userAgent = navigator.userAgent;
            const browserInfo = this.getBrowserInfo(userAgent);
            const osInfo = this.getOSInfo(userAgent);
            return `${browserInfo.name} ${browserInfo.version}, ${osInfo.name} ${osInfo.version}`;
        }
        getBrowserInfo(ua) {
            var _a, _b, _c, _d;
            if (/Chrome\/([0-9.]+)/.test(ua)) {
                const version = ((_a = ua.match(/Chrome\/([0-9.]+)/)) === null || _a === void 0 ? void 0 : _a[1]) || "";
                if (/Edg\//.test(ua)) {
                    return { name: "Edge", version };
                }
                return { name: "Chrome", version };
            }
            if (/Firefox\/([0-9.]+)/.test(ua)) {
                const version = ((_b = ua.match(/Firefox\/([0-9.]+)/)) === null || _b === void 0 ? void 0 : _b[1]) || "";
                return { name: "Firefox", version };
            }
            if (/Safari\/([0-9.]+)/.test(ua) && /Version\/([0-9.]+)/.test(ua)) {
                const version = ((_c = ua.match(/Version\/([0-9.]+)/)) === null || _c === void 0 ? void 0 : _c[1]) || "";
                return { name: "Safari", version };
            }
            if (/MSIE|Trident/.test(ua)) {
                const version = ((_d = ua.match(/(?:MSIE |rv:)(\d+(\.\d+)?)/)) === null || _d === void 0 ? void 0 : _d[1]) || "";
                return { name: "Internet Explorer", version };
            }
            return { name: "Unknown", version: "" };
        }
        getOSInfo(ua) {
            var _a, _b, _c;
            if (/Windows NT ([0-9.]+)/.test(ua)) {
                const version = ((_a = ua.match(/Windows NT ([0-9.]+)/)) === null || _a === void 0 ? void 0 : _a[1]) || "";
                return { name: "Windows", version };
            }
            if (/Mac OS X ([0-9._]+)/.test(ua)) {
                const version = (((_b = ua.match(/Mac OS X ([0-9._]+)/)) === null || _b === void 0 ? void 0 : _b[1]) || "").replace(/_/g, ".");
                return { name: "macOS", version };
            }
            if (/Android ([0-9.]+)/.test(ua)) {
                const version = ((_c = ua.match(/Android ([0-9.]+)/)) === null || _c === void 0 ? void 0 : _c[1]) || "";
                return { name: "Android", version };
            }
            if (/Linux/.test(ua)) {
                return { name: "Linux", version: "" };
            }
            return { name: "Unknown", version: "" };
        }
        mount() {
            document.body.appendChild(this.element);
        }
        show() {
            this.element.style.display = "block";
            requestAnimationFrame(() => {
                this.element.style.opacity = "1";
                this.element.style.transform = "translateY(0)";
            });
        }
        hide() {
            this.element.style.display = "none";
            this.element.style.transform = "translateY(10px)";
            setTimeout(() => {
                this.element.style.display = "none";
            }, 200);
        }
        injectStyles() {
            const styleElement = document.createElement("style");
            styleElement.textContent = `
      ${modalStyles}
      ${successStyles}
    `;
            document.head.appendChild(styleElement);
        }
    }

    class FeedbackKing {
        constructor(config) {
            this.modal = null;
            this.config = { ...config };
            this.validateConfig();
            this.init();
        }
        validateConfig() {
            if (!this.config.projectId) {
                throw new Error("FeedbackKing: projectId is required");
            }
        }
        init() {
            // 监听打开 Modal 事件
            document.addEventListener("click", (e) => {
                const target = e.target;
                if (target.matches("[data-feedback-king-button]")) {
                    this.showModal();
                }
            });
        }
        showModal() {
            // 懒加载：只在第一次点击时创建和挂载模态框
            if (!this.modal) {
                this.modal = new FeedbackModal(this.config);
                this.modal.mount();
            }
            this.modal.show();
        }
    }
    // 确保导出到全局
    if (typeof window !== "undefined") {
        window.FeedbackKing = FeedbackKing;
    }

    return FeedbackKing;

}));
//# sourceMappingURL=feedback-king.js.map
