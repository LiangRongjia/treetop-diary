import React from 'react'
import styles from './EditorArea.module.css'
import TitleEditor from './TitleEditor/TitleEditor'
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor'
import TagsEditor from './TagsEditor/TagsEditor'
import CurrentPath from './CurrentPath/CurrentPath'

const EditorArea:
    React.FC<{
        year: number,
        month: number,
        date: number,
        handle: number,
        title: string,
        tags: string[],
        content: string,
        titleEditorPlaceholder: string,
        onTitleChange: (newTitle: string) => void,
        onTagsChange: (newTags: string[]) => void,
        onContentChange: (newContent: string) => void
    }> = ({
        year,
        month,
        date,
        handle,
        title,
        tags,
        content,
        onTitleChange,
        onTagsChange,
        onContentChange,
        titleEditorPlaceholder
    }) => {

        return (
            <div className={styles.diary_page}>
                <CurrentPath
                    year={year}
                    month={month}
                    date={date}
                />
                <TitleEditor
                    handle={handle}
                    title={title}
                    onChange={onTitleChange}
                    placeholder={titleEditorPlaceholder}
                />
                <TagsEditor
                    key={handle}
                    tags={tags}
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