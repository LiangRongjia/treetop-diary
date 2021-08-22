import React from 'react'
import { Month } from '../../types'
import MonthListItem, { MonthListItemClass } from './MonthListItem/MonthListItem'
import styles from './MonthList.module.css'

const MonthList:
    React.FC<{
        months: Month[],
        activeMonthIndex: number,
        onSelectMonth: (newMonthIndex: number) => void
    }> = ({
        months,
        activeMonthIndex,
        onSelectMonth
    }) => {

        console.log('[MonthList Render]')

        return (
            <div className={styles.month_list}>
                {months.map(month =>
                    new MonthListItemClass(`${month.index}`)
                        .monthIndex(month.index)
                        .monthTitle(month.title)
                        .selected(month.index === activeMonthIndex)
                        .onSelectMonth(() => onSelectMonth(month.index))
                        .done()
                )}
                {/* {months.map(month => (
                    <MonthListItem
                        monthIndex={month.index}
                        monthTitle={month.title}
                        selected={month.index === activeMonthIndex}
                        onSelectMonth={() => onSelectMonth(month.index)}
                        key={month.index}
                    />
                ))} */}
            </div>
        )
    }


class MonthListClass {
    #key: string = ''
    #months: Month[] = []
    #activeMonthIndex: number = 0
    #onSelectMonth: (newMonthIndex: number) => void = () => { }

    constructor(key: string = '') {
        this.#key = key
    }
    months(months: Month[]) {
        this.#months = months
        return this
    }
    activeMonthIndex(index: number) {
        this.#activeMonthIndex = index
        return this
    }
    onSelectMonth(callback: (newMonthIndex: number) => void) {
        this.#onSelectMonth = callback
        return this
    }
    done() {
        return (
            <div key={this.#key} className={styles.month_list}>
                {this.#months.map(
                    month => new MonthListItemClass(`${month.index}`)
                        .monthIndex(month.index)
                        .monthTitle(month.title)
                        .selected(month.index === this.#activeMonthIndex)
                        .onSelectMonth(() => this.#onSelectMonth(month.index))
                        .done()
                )}
            </div>
        )
    }
}

export default MonthList

export { MonthListClass }
