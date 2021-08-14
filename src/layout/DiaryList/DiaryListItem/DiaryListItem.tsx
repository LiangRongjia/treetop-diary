import React from "react"
import styles from './DiaryListItem.module.css'

const DiaryListItem:
    React.FC<{
        diaryIndex: number,
        diaryTitle: string,
        selected: boolean,
        onClick: () => void
    }> = ({
        diaryIndex,
        diaryTitle,
        selected,
        onClick
    }) => (
        <div className={styles.diary_list_item}
            data-selected={selected ? 'true' : 'false'}
            onClick={onClick}>
            <div className={styles.diary_list_item_index}>{diaryIndex}</div>
            <div className={styles.diary_list_item_title}>{diaryTitle}</div>
        </div >
    )

export default DiaryListItem