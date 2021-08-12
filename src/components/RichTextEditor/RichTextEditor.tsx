import React, { createRef, useEffect, useRef } from "react"
import E from 'wangeditor'

import styles from './RichTextEditor.module.css'

/**
 * 基于 wangeditor 的富文本编辑器组件
 * 1. 通过 `onChange` 回调函数接口获取当前富文本的 `html` 值
 * 2. 通过变更 `handle` 重置编辑器
 */
const RichTextEditor = ({
    handle,
    initialHtmlContent,
    className,
    onChange
}: {
    handle: number,
    initialHtmlContent?: string,
    className?: string,
    onChange?: (curContent: string) => void
}) => {

    const elemMenu = useRef(createRef<HTMLDivElement>()).current
    const elemBody = useRef(createRef<HTMLDivElement>()).current

    /**
     * 当 handle 变更的时候，清除副作用：删除编辑器，并重建编辑器
     */
    useEffect(() => {

        const editor = new E(elemMenu.current, elemBody.current)

        editor.config.onchange = () => {
            onChange && onChange(editor.txt.html() || '')
        }

        editor.config.menus = [
            'head',  // 标题
            'bold',  // 粗体
            'fontSize',  // 字号
            'fontName',  // 字体
            'italic',  // 斜体
            'underline',  // 下划线
            'strikeThrough',  // 删除线
            'foreColor',  // 文字颜色
            'backColor',  // 背景颜色
            'link',  // 插入链接
            'list',  // 列表
            'justify',  // 对齐方式
            'quote',  // 引用
            'emoticon',  // 表情
            'image',  // 插入图片
            'table',  // 表格
            'video',  // 插入视频
            'code',  // 插入代码
            'undo',  // 撤销
            'redo'  // 重复
        ]

        editor.config.uploadImgShowBase64 = true
        editor.create()

        editor.txt.html(initialHtmlContent || '')

        return () => {
            editor.destroy()
        }

    }, [handle])

    return (
        <div className={`${styles.rich_text_editor} ${className || ''}`}>
            <div ref={elemMenu}
                className={styles.rich_text_editor_menu}
            ></div>
            <div ref={elemBody}
                className={styles.rich_text_editor_body}
            ></div>
        </div>
    )
}

export default RichTextEditor