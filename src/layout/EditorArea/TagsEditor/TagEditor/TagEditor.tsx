import React from 'react'
import TextEditor, { TextEditorCtx } from '../../../../components/TextEditor/TextEditor'
import styles from './TagEditor.module.css'

const TagEditor = ({
    text,
    onChange,
    onDelete
}: {
    text: string,
    onChange: (newText: string) => void
    onDelete: () => void
}) => {

    const _onChange = (ctx: TextEditorCtx) => {
        onChange(ctx.text)
    }

    return (
        <div className={styles.tag}>
            <TextEditor
                text={text}
                placeholder="新标签"
                className={styles.text}
                onChange={_onChange}
            />
            <div
                className={styles.delete_button}
                onClick={onDelete}
            ></div>
        </div>
    )
}

export default TagEditor