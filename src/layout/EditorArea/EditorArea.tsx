import React from 'react'
import styles from './EditorArea.module.css'
import TitleEditor from './TitleEditor/TitleEditor'
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor'
import TagsEditor from './TagsEditor/TagsEditor'

const EditorArea = ({
    handle,
    title,
    tags,
    content,
    onTitleChange,
    onTagsChange,
    onContentChange,
    titleEditorPlaceholder
}: {
    handle: number,
    title: string,
    tags: string[],
    content: string,
    titleEditorPlaceholder: string,
    onTitleChange: (newTitle: string) => void,
    onTagsChange: (newTags: string[]) => void,
    onContentChange: (newContent: string) => void
}) => {

    return (
        <div className={styles.diary_page}>
            <TitleEditor
                initialTitle={title}
                onChange={onTitleChange}
                handle={handle}
                placeholder={titleEditorPlaceholder}
            />
            <TagsEditor
                initialTags={tags}
                handle={handle}
                onTagsChange={onTagsChange}
            />
            <RichTextEditor
                className={styles.content_editor}
                onChange={onContentChange}
                handle={handle}
                initialHtmlContent={content}
            />
        </div>
    )

}

export default EditorArea