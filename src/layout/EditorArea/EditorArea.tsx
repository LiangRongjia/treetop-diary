import React from 'react'
import styles from './EditorArea.module.css'
import TitleEditor from './TitleEditor/TitleEditor'
import RichTextEditor from '../../components/RichTextEditor/RichTextEditor'
import TagsEditor from './TagsEditor/TagsEditor'
import CurrentPath from './CurrentPath/CurrentPath'
import { Path } from '../../types'

const EditorArea:
    React.FC<{
        path: Path,
        handle: number,
        title: string,
        tags: string[],
        content: string,
        titleEditorPlaceholder: string,
        onTitleChange: (newTitle: string) => void,
        onTagsChange: (newTags: string[]) => void,
        onContentChange: (newContent: string) => void,
        onDeletePath: (path: Path) => void
    }> = ({
        path,
        handle,
        title,
        tags,
        content,
        titleEditorPlaceholder,
        onTitleChange,
        onTagsChange,
        onContentChange,
        onDeletePath
    }) => {

        return (
            <div className={styles.diary_page}>
                <CurrentPath
                    path={path}
                    onDeletePath={onDeletePath}
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