import React, { createRef, useEffect } from "react"
import styles from "./TextEditor.module.css"

class TextEditorCtx {
    ele
    text
    constructor(ref: React.RefObject<HTMLDivElement>) {
        this.ele = ref.current
        this.text = ref.current?.textContent || ''
    }
}

/**
 * 设置 contentEditable div 样式。
 * 1. 检查内容是否为空，同步设置 data-is-empty 属性，通知 CSS 控制样式
 * @param divEle contentEditable div 元素
 */
const updateContentEditableDivStyle = (divEle: HTMLDivElement) => {
    const isEmpty = divEle.textContent === ''
    divEle.setAttribute('data-is-empty', isEmpty ? 'true' : 'false')
}

/**
 * 设置 contentEditable div 状态。
 * 1. 设置文本内容
 * 2. 检查内容是否为空，同步设置 data-is-empty 属性，通知 CSS 控制样式
 * @param divEle contentEditable div 元素
 * @param text 要更新的文本
 */
const updateContentEditableDiv = (divEle: HTMLDivElement, text: string) => {
    divEle.textContent = text || ''
    updateContentEditableDivStyle(divEle)
}

const TextEditor2: React.FC<{
    text?: string,
    placeholder?: string,
    className?: string,
    disabled?: boolean,
    onChange?: (ctx: TextEditorCtx, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    onDoubleClick?: (ctx: TextEditorCtx, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    onClick?: (ctx: TextEditorCtx, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}> = ({
    text,
    placeholder,
    className,
    disabled,
    onChange,
    onDoubleClick,
    onClick
}) => {
        const eleRef = createRef<HTMLDivElement>()

        const _onInput = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            eleRef.current && updateContentEditableDivStyle(eleRef.current)
            onChange && onChange(new TextEditorCtx(eleRef), e)
        }

        const _onDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            onDoubleClick && onDoubleClick(new TextEditorCtx(eleRef), e)
        }

        const _onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            onClick && onClick(new TextEditorCtx(eleRef), e)
        }

        /** 
         * 入参变更则更新 div 内容，因为无法使用 React 的 {} 绑定，必须手动绑定
         */
        useEffect(() => {
            eleRef.current && updateContentEditableDiv(eleRef.current, text || '')
        })

        return (
            <div
                ref={eleRef}
                className={`${styles.text_editor} ${className}`}
                contentEditable={disabled ? 'false' : 'true'}
                placeholder={placeholder}
                data-is-empty="false"
                onInput={_onInput}
                onDoubleClick={_onDoubleClick}
                onClick={_onClick}
            ></div>
        )
    }

export default TextEditor2

export { TextEditorCtx }