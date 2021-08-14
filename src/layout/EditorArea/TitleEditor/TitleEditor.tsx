import React from "react"

import TextEditor, { TextEditorCtx } from "../../../components/TextEditor/TextEditor"

import styles from "./TitleEditor.module.css"

const TitleEditor:
    React.FC<{
        initialTitle: string,
        placeholder: string,
        onChange: (newTitle: string) => void
    }> = ({
        initialTitle,
        onChange,
        placeholder
    }) => {

        const _onChange = (ctx: TextEditorCtx) => {
            onChange && onChange(ctx.text)
        }

        console.log('[TitleEditor Render]')

        return (
            <TextEditor
                defaultText={initialTitle || ''}
                placeholder={placeholder || ''}
                className={styles.title_editor}
                onInput={_onChange}
            />
        )
    }

export default TitleEditor