import React from "react"

import TextEditor from "../../../components/TextEditor/TextEditor"

import styles from "./TitleEditor.module.css"

const TitleEditor = ({
    handle,
    initialTitle,
    onChange,
    placeholder
}: {
    handle: number,
    initialTitle?: string,
    placeholder?: string,
    onChange?: (newTitle: string) => void
}) => {

    return (
        <TextEditor
            initialText={initialTitle || ''}
            placeholder={placeholder || ''}
            className={styles.title_editor}
            onChange={onChange || (() => { })}
            handle={handle}
        />
    )
}

export default TitleEditor