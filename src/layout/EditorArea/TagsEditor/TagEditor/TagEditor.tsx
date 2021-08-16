import React, { useEffect, useState } from 'react'
import TextEditor, { TextEditorCtx } from '../../../../components/TextEditor/TextEditor'
import styles from './TagEditor.module.css'

const TagEditor:
    React.FC<{
        target: string,
        text: string,
        onChange: (newText: string) => void
        onDelete: () => void
    }> = ({
        target,
        text,
        onChange,
        onDelete
    }) => {

        const [originalText, setOriginalText] = useState(text)

        const _onChange = (ctx: TextEditorCtx) => {
            onChange(ctx.text)
        }

        useEffect(() => {
            setOriginalText(text)
        }, [target])

        return (
            <div className={styles.tag}>
                <TextEditor
                    key={target}
                    defaultText={originalText}
                    placeholder="新标签"
                    className={styles.text}
                    onInput={_onChange}
                />
                <div
                    className={styles.delete_button}
                    onClick={onDelete}
                ></div>
            </div>
        )
    }

export default TagEditor