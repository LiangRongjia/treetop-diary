import React from 'react'

import styles from './App.module.css'

import Header from './Header/Header'
import EditorArea from './EditorArea/EditorArea'
import useApp from './useApp'
import PasswordDialog from './PasswordDialog/PasswordDialog'
import ExportDialog from './ExportDialog/ExportDialog'
import { Catalog } from './Catalog/Catalog'

const App = () => {

    const {
        yearIndexs,
        years: slimYears,
        path,
        activeYearIndex,
        editTarget,
        editorHandle,
        bookName,
        passwordDialogShow,
        password,
        exportDialogShow,
        onBookNameChange,
        onImportFile,
        onHeaderExportFile,
        verifyPassword,
        hidePasswordDialog,
        hideExportDialog,
        dialogExportFile,
        changePath,
        onAddDiary,
        onAddMonth,
        onAddYear,
        onDeletePath
    } = useApp()

    return (
        <div id="app" className={styles.app}>
            <Header
                activeYearIndex={activeYearIndex}
                yearIndexs={yearIndexs}
                bookName={bookName}
                onBookNameChange={onBookNameChange}
                onImportFile={onImportFile}
                onExportFile={onHeaderExportFile}
            />
            <main className={styles.main}>
                <div className={styles.catalog_wrapper}>
                    <Catalog
                        years={slimYears}
                        path={path}
                        onChangePath={changePath}
                        onAddDiary={onAddDiary}
                        onAddMonth={onAddMonth}
                        onAddYear={onAddYear}
                    />
                </div>
                <EditorArea
                    path={path}
                    handle={editorHandle}
                    title={editTarget.title}
                    tags={editTarget.tags}
                    content={editTarget.content}
                    titleEditorPlaceholder={editTarget.titleEditorPlaceholder}
                    onContentChange={editTarget.onContentChange}
                    onTagsChange={editTarget.onTagsChange}
                    onTitleChange={editTarget.onTitleChange}
                    onDeletePath={onDeletePath}
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
