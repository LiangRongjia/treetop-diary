import React from 'react'
import { Diary } from '../../types'
import styles from './DiaryList.module.css'
import DiaryListItem from './DiaryListItem/DiaryListItem'

const DiaryList:
    React.FC<{
        diarys: Diary[],
        activeDiaryIndex: number,
        onSelectDiary: (newDiaryIndex: number) => void
    }> = ({
        diarys,
        activeDiaryIndex: activeDiary,
        onSelectDiary
    }) => {

        return (
            <div className={styles.diary_list}>
                {diarys.map(diary => (
                    <DiaryListItem
                        diaryIndex={diary.index}
                        diaryTitle={diary.title}
                        selected={diary.index === activeDiary}
                        onClick={() => onSelectDiary(diary.index)}
                        key={diary.index}
                    />
                ))}
            </div>
        )
    }

export default DiaryList
