import React from 'react'

import styles from './App.module.css'

import Header from './Header/Header'
import MonthList from './MonthList/MonthList'
import DiaryList from './DiaryList/DiaryList'
import EditorArea from './EditorArea/EditorArea'
import useApp from './useApp'

const App = () => {

    const {
        yearIndexs,
        months,
        diarys,
        activeDiaryIndex,
        activeMonthIndex,
        editTarget,
        editorHandle,
        onSelectYear,
        onSelectMonth,
        onSelectDiary
    } = useApp()

    console.log('[App Render]')

    return (
        <div id="app" className={styles.app}>
            <Header
                yearIndexs={yearIndexs}
                onSelectYear={onSelectYear}
            />
            <MonthList
                months={months}
                activeMonthIndex={activeMonthIndex}
                onSelectMonth={onSelectMonth}
            />
            {activeMonthIndex === 0
                ? undefined
                : <DiaryList
                    diarys={diarys}
                    activeDiaryIndex={activeDiaryIndex}
                    onSelectDiary={onSelectDiary}
                />
            }
            <EditorArea
                handle={editorHandle}
                title={editTarget.title}
                tags={editTarget.tags}
                content={editTarget.content}
                titleEditorPlaceholder={editTarget.titleEditorPlaceholder}
                onContentChange={editTarget.onContentChange}
                onTagsChange={editTarget.onTagsChange}
                onTitleChange={editTarget.onTitleChange}
            />
        </div >
    )
}

export default App
