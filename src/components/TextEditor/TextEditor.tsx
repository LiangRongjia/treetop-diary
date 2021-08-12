import React, { createRef, useEffect } from "react"
import styles from "./TextEditor.module.css"

/**
 * 文本编辑器
 * 1. 通过 `onChange` 回调函数接口获取当前文本值
 * 2. 通过变更 `handle` 重置编辑器
 */
const TextEditor = ({
    initialText,
    placeholder,
    className,
    onChange,
    handle,
    disabled
}: {
    initialText: string,
    placeholder: string,
    className: string,
    handle: number,
    onChange: (currentText: string) => void,
    disabled?: boolean
}) => {

    const eleRef = createRef<HTMLDivElement>()

    const onInput = () => {
        const isVoid = (eleRef.current?.textContent || '') === '' ? 'true' : 'false'
        eleRef.current?.setAttribute('data-is-void', isVoid)
        onChange(eleRef.current?.textContent || '')
    }

    /**
     * 当 handle 发生变化，重置 TextEditor
     */
    useEffect(() => {
        if (eleRef.current) {
            eleRef.current.textContent = initialText
        }
        onInput()
    }, [handle])

    return (
        <div
            className={`${styles.text_editor} ${className}`}
            ref={eleRef}
            contentEditable={disabled ? 'false' : 'true'}
            placeholder={placeholder}
            data-is-void="false"
            onInput={onInput}></div>
    )
}

export default TextEditor