import React, { createRef } from 'react'
import styles from './Header.module.css'

const Header = ({
    yearIndexs: yearIndexs,
    onSelectYear
}: {
    yearIndexs: number[],
    onSelectYear?: (newYearIndex: number) => void
}) => {

    const selector = createRef<HTMLSelectElement>()

    const onChange = () => {
        if (selector.current === null) return
        const optionIndex = selector.current.selectedIndex
        const yearIndex = parseInt(selector.current.options[optionIndex].value)
        onSelectYear && onSelectYear(yearIndex)
    }

    console.log('[Header Render]')

    return (
        <div className={styles.header}>
            <select
                ref={selector}
                onChange={onChange}>
                {yearIndexs.map(yearIndex => (
                    <option
                        value={yearIndex}
                        key={yearIndex}>
                        {yearIndex}
                    </option>
                ))}
            </select>
        </div >
    )
}

export default Header
