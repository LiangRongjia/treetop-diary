import React from 'react'
import TextEditor, { TextEditorCtx } from '../../../../components/TextEditor/TextEditor'
import styles from './TagEditor.module.css'

const TagEditor = ({
    handle,
    initialText,
    onChange,
    onDelete
}: {
    handle: number,
    initialText: string,
    onChange: (newText: string) => void
    onDelete: () => void
}) => {

    const _onChange = (ctx: TextEditorCtx) => {
        onChange(ctx.text)
    }

    return (
        <div className={styles.tag}>
            <TextEditor
                initialText={initialText}
                placeholder="新标签"
                className={styles.text}
                onChange={_onChange}
                handle={handle}
            />
            <div
                className={styles.delete_button}
                onClick={onDelete}
            ></div>
        </div>
    )
}

export default TagEditor