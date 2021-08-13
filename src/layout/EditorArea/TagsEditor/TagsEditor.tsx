import React from "react"
import TagEditor from './TagEditor/TagEditor'

import styles from './TagsEditor.module.css'

const TagsEditor = ({
    tags: tags,
    onTagsChange
}: {
    tags: string[]
    onTagsChange: (newTags: string[]) => void
}) => {

    const _onEditTag = (tagIndex: number) => (newText: string) => {
        const newTags = [...tags]
        newTags[tagIndex] = newText
        onTagsChange(newTags)
    }

    const _onDeleteTag = (tagIndex: number) => () => {
        const newTags = tags.filter((_, i) => i !== tagIndex)
        onTagsChange(newTags)
    }

    const _onAddTag = () => {
        const newTags = [...tags, '']
        onTagsChange(newTags)
    }

    return (
        <div className={styles.tags_bar}>
            {tags.map((tag, index) => (
                <TagEditor
                    key={index}
                    text={tag}
                    onChange={_onEditTag(index)}
                    onDelete={_onDeleteTag(index)}
                />
            ))}
            <div
                className={styles.add_button}
                onClick={_onAddTag}
            ></div>
        </div>
    )
}

export default TagsEditor