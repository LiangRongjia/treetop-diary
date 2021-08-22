import React from 'react'
import styles from './MonthListItem.module.css'

const MonthListItem:
    React.FC<{
        monthIndex: number,
        monthTitle: string,
        selected: boolean
        onSelectMonth: () => void
    }> = ({
        monthIndex,
        monthTitle,
        selected,
        onSelectMonth
    }) => {

        return (
            <div className={`${styles.month_list_item}`}
                onClick={onSelectMonth}
                data-selected={selected ? 'true' : 'false'}>
                <div className={styles.month_list_item_index}>{monthIndex}</div>
                <div className={styles.month_list_item_title}>{monthTitle}</div>
            </div >
        )

    }

class MonthListItemClass {
    #key: string = ''
    #selected: boolean = false
    #monthIndex: number = 0
    #monthTitle: string = ''
    constructor(key: string = '') {
        this.#key = key
    }
    #onSelectMonth: () => void = () => { }
    onSelectMonth(onClick: () => void) {
        this.#onSelectMonth = onClick
        return this
    }
    selected(bool: boolean) {
        this.#selected = bool
        return this
    }
    monthIndex(index: number) {
        this.#monthIndex = index
        return this
    }
    monthTitle(text: string) {
        this.#monthTitle = text
        return this
    }
    done() {
        return (
            <div key={this.#key}
                className={`${styles.month_list_item}`}
                onClick={this.#onSelectMonth}
                data-selected={this.#selected ? 'true' : 'false'}>
                <div className={styles.month_list_item_index}>{this.#monthIndex}</div>
                <div className={styles.month_list_item_title}>{this.#monthTitle}</div>
            </div >
        )
    }
}

export default MonthListItem
export { MonthListItemClass }