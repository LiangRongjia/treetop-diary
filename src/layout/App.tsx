import React from 'react'

import styles from './App.module.css'

import Header from './Header/Header'
import MonthList, { MonthListClass } from './MonthList/MonthList'
import DiaryList from './DiaryList/DiaryList'
import EditorArea from './EditorArea/EditorArea'
import useApp from './useApp'
import PasswordDialog from './PasswordDialog/PasswordDialog'
import ExportDialog from './ExportDialog/ExportDialog'
import { TreeItem, TreeView } from '../components/TreeView/TreeView'
import { Path } from '../types'
import { Catalog } from './Catalog/Catalog'

const App = () => {

    const {
        yearIndexs,
        slimYears,
        curPath,
        months,
        diarys,
        path,
        activeYearIndex,
        activeDiaryIndex,
        activeMonthIndex,
        editTarget,
        editorHandle,
        bookName,
        passwordDialogShow,
        password,
        exportDialogShow,
        // onSelectYear,
        // onSelectMonth,
        // onSelectDiary,
        // onEditYearIndex,
        // onDeleteYear,
        // onAddYear,
        onBookNameChange,
        onImportFile,
        onHeaderExportFile,
        verifyPassword,
        hidePasswordDialog,
        hideExportDialog,
        dialogExportFile,
        selectPath
    } = useApp()

    return (
        <div id="app" className={styles.app}>
            <Header
                activeYearIndex={activeYearIndex}
                yearIndexs={yearIndexs}
                bookName={bookName}
                // onSelectYear={onSelectYear}
                // onEditYearIndex={onEditYearIndex}
                // onDeleteYear={onDeleteYear}
                // onAddYear={onAddYear}
                onBookNameChange={onBookNameChange}
                onImportFile={onImportFile}
                onExportFile={onHeaderExportFile}
            />
            <main className={styles.main}>
                {
                    new Catalog()
                        .years(slimYears)
                        .path(path)
                        .onChangePath(selectPath)
                        .done()
                }
                <EditorArea
                    year={activeYearIndex}
                    month={activeMonthIndex}
                    date={activeDiaryIndex}
                    handle={editorHandle}
                    title={editTarget.title}
                    tags={editTarget.tags}
                    content={editTarget.content}
                    titleEditorPlaceholder={editTarget.titleEditorPlaceholder}
                    onContentChange={editTarget.onContentChange}
                    onTagsChange={editTarget.onTagsChange}
                    onTitleChange={editTarget.onTitleChange}
                />
            </main>
            <PasswordDialog
                isShow={passwordDialogShow}
                hide={hidePasswordDialog}
                verify={verifyPassword}
            />
            <ExportDialog
                defaultPassword={password}
                show={exportDialogShow}
                hide={hideExportDialog}
                onExport={dialogExportFile}
            />
        </div>
    )
}

export default App
