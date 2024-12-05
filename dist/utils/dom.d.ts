/**
 * 创建 DOM 元素的工具函数
 */
interface CreateElementOptions {
    className?: string;
    innerHTML?: string;
    attributes?: Record<string, string>;
    styles?: Partial<CSSStyleDeclaration>;
}
export declare function createElement(tag: string, options?: CreateElementOptions): HTMLElement;
/**
 * 添加样式到页面
 */
export declare function injectStyles(styles: string): void;
/**
 * 获取元素的绝对位置
 */
export declare function getElementPosition(element: HTMLElement): {
    top: number;
    left: number;
};
/**
 * 检查元素是否在视口中
 */
export declare function isElementInViewport(element: HTMLElement): boolean;
/**
 * 防抖函数
 */
export declare function debounce<T extends (...args: any[]) => any>(func: T, wait: number): (...args: Parameters<T>) => void;
export {};
