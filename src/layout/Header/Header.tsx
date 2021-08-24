import React, { createRef } from 'react'
import FileController from './FileController/FileController'
import styles from './Header.module.css'
import YearsEditor from './YearsEditor/YearsEditor'

const Header:
    React.FC<{
        bookName: string,
        activeYearIndex: number,
        yearIndexs: number[],
        onSelectYear: (newYearIndex: number) => void,
        onEditYearIndex: (oldIndex: number, newIndex: number) => void,
        onDeleteYear: (index: number) => void,
        onAddYear: (yearIndex: number) => void,
        onBookNameChange: (newFileName: string) => void,
        onImportFile: (file: string) => void,
        onExportFile: () => void
    }> = ({
        bookName,
        activeYearIndex,
        yearIndexs,
        onSelectYear,
        onEditYearIndex,
        onDeleteYear,
        onAddYear,
        onBookNameChange,
        onImportFile,
        onExportFile
    }) => {

        console.log('[Header Render]')

        return (
            <div className={styles.header}>
                <div className={styles.background}></div>
                <div className={styles.content}>
                    <YearsEditor
                        activeYearIndex={activeYearIndex}
                        yearIndexs={yearIndexs}
                        onEditYearIndex={onEditYearIndex}
                        onAddYear={onAddYear}
                        onDeleteYear={onDeleteYear}
                        onSelectYear={onSelectYear}
                    />
                    <FileController
                        fileName={bookName}
                        onFileNameChange={onBookNameChange}
                        onImportFile={onImportFile}
                        onExportFile={onExportFile}
                    /></div>
            </div>
        )
    }

export default Header
