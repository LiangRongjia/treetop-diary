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
 * 文本编辑器
 * 1. 通过 `onChange` 回调函数接口获取当前文本值
 * 2. 通过变更 `handle` 重置编辑器
 */
const TextEditor = ({
    initialText,
    placeholder,
    className,
    handle,
    disabled,
    onChange,
    onDoubleClick,
    onClick
}: {
    initialText?: string,
    placeholder?: string,
    className?: string,
    handle: number,
    disabled?: boolean,
    onChange?: (ctx: TextEditorCtx) => void,
    onDoubleClick?: (ctx: TextEditorCtx, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void,
    onClick?: (ctx: TextEditorCtx, e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}) => {

    const eleRef = createRef<HTMLDivElement>()

    const onInput = () => {
        const isVoid = (eleRef.current?.textContent || '') === '' ? 'true' : 'false'
        eleRef.current?.setAttribute('data-is-void', isVoid)
        onChange && onChange(new TextEditorCtx(eleRef))
    }

    /**
     * 当 handle 发生变化，重置 TextEditor
     */
    useEffect(() => {
        if (eleRef.current) {
            eleRef.current.textContent = initialText || ''
        }
        onInput()
    }, [handle, disabled])

    const _onDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onDoubleClick && onDoubleClick(new TextEditorCtx(eleRef), e)
    }

    const _onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        onClick && onClick(new TextEditorCtx(eleRef), e)
    }

    return (
        <div
            className={`${styles.text_editor} ${className}`}
            ref={eleRef}
            contentEditable={disabled ? 'false' : 'true'}
            placeholder={placeholder}
            data-is-void="false"
            onInput={onInput}
            onDoubleClick={_onDoubleClick}
            onClick={(_onClick)}
        ></div>
    )
}

export default TextEditor
export { TextEditorCtx }