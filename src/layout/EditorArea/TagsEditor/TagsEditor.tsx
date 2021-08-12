import React, { useEffect, useState } from "react"
import TagEditor from './TagEditor/TagEditor'

import styles from './TagsEditor.module.css'

const TagsEditor = ({
    handle,
    initialTags,
    onTagsChange
}: {
    handle: number
    initialTags: string[]
    onTagsChange: (newTags: string[]) => void
}) => {

    const [tags, setTags] = useState([...initialTags])
    const [tagEditorsHandle, setTagEditorsHandle] = useState(0)

    useEffect(() => {
        setTags([...initialTags])
        setTagEditorsHandle(h => h + 1)
    }, [handle])

    useEffect(() => {
        setTagEditorsHandle(h => h + 1)
    }, [tags.length])

    const onEditTag = (tagIndex: number) => (newText: string) => {
        const newTags = [...tags]
        newTags[tagIndex] = newText
        setTags(newTags)
        onTagsChange(newTags)
    }

    const onDeleteTag = (tagIndex: number) => () => {
        const newTags = tags.filter((_, i) => i !== tagIndex)
        setTags(newTags)
        onTagsChange(newTags)
    }

    const onAddTag = () => {
        const newTags = [...tags, '']
        setTags(newTags)
        onTagsChange(newTags)
    }

    return (
        <div className={styles.tags_bar}>
            {initialTags.map((tag, index) => (
                <TagEditor
                    key={index}
                    handle={tagEditorsHandle}
                    initialText={tag}
                    onChange={onEditTag(index)}
                    onDelete={onDeleteTag(index)}
                />
            ))}
            <div
                className={styles.add_button}
                onClick={onAddTag}
            ></div>
        </div>
    )
}

export default TagsEditor