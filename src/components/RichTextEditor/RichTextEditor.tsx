import React from "react"

import styles from './RichTextEditor.module.css'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

/**
 * 基于 react-quill 的富文本编辑器组件
 * 1. 通过 `onChange` 回调函数接口获取当前富文本的 `html` 值
 * 2. 通过变更 `handle` 重置编辑器
 */
const RichTextEditor:
    React.FC<{
        handle: number,
        initialHtmlContent?: string,
        className?: string,
        onChange?: (curContent: string) => void
    }> = ({
        handle,
        initialHtmlContent,
        className,
        onChange
    }) => {

        const _onChange = (content: string) => {
            onChange && onChange(content)
        }

        return (
            <ReactQuill
                className={`${styles.rich_text_editor} ${className}`}
                key={handle}
                theme="snow"
                value={initialHtmlContent}
                onChange={_onChange}
            />
        )
    }

export default RichTextEditor