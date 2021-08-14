import React, { createRef, useEffect } from "react"
import styles from "./TextEditor.module.css"

/**
 * `TextEditor` 向调用者提供的内部数据对象。
 */
class TextEditorCtx {
    evt
    ele
    text
    constructor(
        ref: React.RefObject<HTMLDivElement>,
        evt: React.MouseEvent<HTMLDivElement, MouseEvent> | null
    ) {
        this.evt = evt
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
 * 设置 contentEditable div 文本。
 * 1. 设置文本内容
 * @param divEle contentEditable div 元素
 * @param text 要更新的文本
 */
const updateContentEditableDivText = (divEle: HTMLDivElement, text: string) => {
    divEle.textContent = text || ''
}

/**
 * 使用单个 `div` 实现的可编辑的文本框。
 * 1. `defaultText` 变更，将重置编辑器，实际显示的 `textContent` 与 `defaultText` 同步；
 * 2. 用户输入将导致 `textContent` 与 `defaultText` 不一致；
 * 3. `disabled` 属性将阻止用户输入，冻结当前 `textContent`，
 *    但若 `defaultText` 更，仍然将导致 `textContent` 与其同步。
 */
const TextEditor:
    React.FC<{
        /** 编辑器初始化文本内容，一旦变更则重新初始化。默认为 `""`。 */
        defaultText?: string,
        /** 文本为空时用于提示的占位文字。默认为 `""`。 */
        placeholder?: string,
        /** 给编辑框 `div` 追加的 `className`。默认为 `""`。 */
        className?: string,
        /** 是否禁用编辑。默认为不禁用：`false`。 */
        disabled?: boolean,
        /** 当输入值时执行。 */
        onInput?: (ctx: TextEditorCtx) => void,
        /** 双击时执行。 */
        onDoubleClick?: (ctx: TextEditorCtx) => void,
        /** 单击时执行。在双击情况下会调用两次。 */
        onClick?: (ctx: TextEditorCtx) => void,
        /** 当设置禁止编辑时执行。 */
        onDisabled?: (ctx: TextEditorCtx) => void
        /** 当设置启用编辑时执行。 */
        onAbled?: (ctx: TextEditorCtx) => void
    }> = ({
        defaultText,
        placeholder,
        className,
        disabled,
        onInput,
        onDoubleClick,
        onClick,
        onDisabled,
        onAbled
    }) => {

        const eleRef = createRef<HTMLDivElement>()

        const _onInput = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            eleRef.current && updateContentEditableDivStyle(eleRef.current)
            onInput && onInput(new TextEditorCtx(eleRef, e))
        }

        const _onDoubleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            onDoubleClick && onDoubleClick(new TextEditorCtx(eleRef, e))
        }

        const _onClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            onClick && onClick(new TextEditorCtx(eleRef, e))
        }

        const _onDisabled = () => {
            onDisabled && onDisabled(new TextEditorCtx(eleRef, null))
        }

        const _onAbled = () => {
            onAbled && onAbled(new TextEditorCtx(eleRef, null))
        }

        /**
         * 当设置 `disabled` 属性时执行
         */
        useEffect(() => {
            disabled
                ? _onDisabled()
                : _onAbled()
        }, [disabled])

        /**
         * 当非 `defaultText` 变更时绑定编辑器文本
         */
        useEffect(() => {
            if (eleRef.current) {
                updateContentEditableDivText(eleRef.current, defaultText || '')
                updateContentEditableDivStyle(eleRef.current)
            }
        }, [defaultText])

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

export default TextEditor

export { TextEditorCtx }