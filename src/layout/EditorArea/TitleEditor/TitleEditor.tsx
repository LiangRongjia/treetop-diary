import React, { useEffect, useState } from "react"

import TextEditor, { TextEditorCtx } from "../../../components/TextEditor/TextEditor"

import styles from "./TitleEditor.module.css"

const TitleEditor:
    React.FC<{
        target: string,
        title: string,
        placeholder: string,
        onChange: (newTitle: string) => void
    }> = ({
        target,
        title,
        onChange,
        placeholder
    }) => {

        /** 对每个 `target` 记录原始 `title` 保证 `TextEditor` 不在编辑时被重置文本 */
        const [originalTitle, setOriginalTitle] = useState(title)

        const _onChange = (ctx: TextEditorCtx) => {
            onChange && onChange(ctx.text)
        }

        /** 当 `target` 变化时，更新原始文本，相当于重置编辑器 */
        useEffect(() => {
            setOriginalTitle(title)
        }, [target])

        console.log('[TitleEditor Render]')

        return (
            <TextEditor
                key={target}
                defaultText={originalTitle}
                placeholder={placeholder || ''}
                className={styles.title_editor}
                onInput={_onChange}
            />
        )
    }

export default TitleEditor