import { createRoot } from 'react-dom/client';
import MessageComponent from "../components/message-component";

const message = {
    dom: null,
    success({ content, duration = 1500 }) {
        // 创建一个dom
        this.dom = document.createElement('div');
        // 定义组件，
        const JSXdom = <MessageComponent content={content} duration={duration} type="success"></MessageComponent>;
        // 渲染DOM
        createRoot(this.dom).render(JSXdom);
        // 置入到body节点下
        document.body.appendChild(this.dom);
    },
    error({ content, duration }) {
        this.dom = document.createElement('div');
        const JSXdom = <MessageComponent content={content} duration={duration} type="error"></MessageComponent>;
        createRoot(this.dom).render(JSXdom);
        document.body.appendChild(this.dom);
    },
    warning({ content, duration }) {
        this.dom = document.createElement('div');
        const JSXdom = <MessageComponent content={content} duration={duration} type="warning"></MessageComponent>;
        createRoot(this.dom).render(JSXdom);
        document.body.appendChild(this.dom);
    },
    info({ content, duration }) {
        this.dom = document.createElement('div');
        const JSXdom = <MessageComponent content={content} duration={duration} type="warning"></MessageComponent>;
        createRoot(this.dom).render(JSXdom);
        document.body.appendChild(this.dom);
    }
};

export default message;
