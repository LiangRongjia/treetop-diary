import React, { createRef } from 'react'
import styles from './Header.module.css'
import YearsEditor from './YearsEditor/YearsEditor'

const Header:
    React.FC<{
        activeYearIndex: number,
        yearIndexs: number[],
        onSelectYear: (newYearIndex: number) => void,
        onEditYearIndex: (oldIndex: number, newIndex: number) => void,
        onDeleteYear: (index: number) => void,
        onAddYear: (yearIndex: number) => void
    }> = ({
        activeYearIndex,
        yearIndexs,
        onSelectYear,
        onEditYearIndex,
        onDeleteYear,
        onAddYear
    }) => {

        const selector = createRef<HTMLSelectElement>()

        const onChange = () => {
            if (selector.current === null) return
            const optionIndex = selector.current.selectedIndex
            const yearIndex = parseInt(selector.current.options[optionIndex].value)
            onSelectYear(yearIndex)
        }

        console.log('[Header Render]')

        return (
            <div className={styles.header}>
                <YearsEditor
                    activeYearIndex={activeYearIndex}
                    yearIndexs={yearIndexs}
                    onEditYearIndex={onEditYearIndex}
                    onAddYear={onAddYear}
                    onDeleteYear={onDeleteYear}
                    onSelectYear={onSelectYear}
                />
            </div>
        )
    }

export default Header
