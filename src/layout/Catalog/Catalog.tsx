import { TreeView } from "../../components/TreeView/TreeView"
import { Path, Year } from "../../types"
import styles from "./Catalog.module.css"

const onClickAddDiary = (years: Year[], yearIdx: number, monthIdx: number, callbackfn: (path: Path) => void) => {
    let newDate = 1
    years.filter(y => y.index === yearIdx)
        .forEach(y => {
            y.months.filter(m => m.index === monthIdx)
                .forEach(m => {
                    if (m.diarys.length !== 0) {
                        newDate = m.diarys[m.diarys.length - 1].index + 1
                    }
                })
        })
    callbackfn(new Path().set().year(yearIdx).month(monthIdx).date(newDate).done())
}

const onClickAddMonth = (years: Year[], yearIdx: number, callbackfn: (path: Path) => void) => {
    let newMonth = 1
    years.filter(y => y.index === yearIdx)
        .forEach(y => {
            if (y.months.length !== 0) {
                newMonth = y.months[y.months.length - 1].index + 1
            }
        })
    callbackfn(new Path().set().year(yearIdx).month(newMonth).done())
}

const onClickAddYear = (years: Year[], callbackfn: (path: Path) => void) => {
    let newYear = 1
    if (years.length !== 0) {
        newYear = years[years.length - 1].index + 1
    }
    callbackfn(new Path().set().year(newYear).done())
}

class Catalog {
    #years: Year[] = []
    #path: Path = new Path()
    #onChangePath: (path: Path) => void = () => { }
    #onAddDiary: (path: Path) => void = () => { }
    #onAddMonth: (path: Path) => void = () => { }
    #onAddYear: (path: Path) => void = () => { }
    years(year: Year[]) {
        this.#years = year
        return this
    }
    path(path: Path) {
        this.#path = path
        return this
    }
    onChangePath(callbackfn: (path: Path) => void) {
        this.#onChangePath = callbackfn
        return this
    }
    onAddDiary(callbackfn: (path: Path) => void) {
        this.#onAddDiary = callbackfn
        return this
    }
    onAddMonth(callbackfn: (path: Path) => void) {
        this.#onAddMonth = callbackfn
        return this
    }
    onAddYear(callbackfn: (path: Path) => void) {
        this.#onAddYear = callbackfn
        return this
    }
    done() {

        return (
            new TreeView('treeView')
                .className(styles.catalog)
                .forEach(this.#years)
                .do((thisTreeView, year) => thisTreeView
                    .addItem(yearItem => yearItem
                        .key(`${year.index}`)
                        .content(`${year.index} ${year.title}`)
                        .active(year.index === this.#path.year
                            && this.#path.month === Infinity)
                        .onClick(() => this.#onChangePath(new Path().set().year(year.index).done()))
                        .forEach(year.months)
                        .do((yearItem, month) => yearItem
                            .child(monthItem => monthItem
                                .key(`${month.index}`)
                                .content(`${month.index} ${month.title}`)
                                .active(year.index === this.#path.year
                                    && month.index === this.#path.month
                                    && this.#path.date === Infinity)
                                .onClick(() => this.#onChangePath(new Path().set().year(year.index).month(month.index).done()))
                                .forEach(month.diarys)
                                .do((monthItem, diary) => monthItem
                                    .child(diaryItem => diaryItem
                                        .key(`${diary.index}`)
                                        .content(`${diary.index} ${diary.title}`)
                                        .active(year.index === this.#path.year
                                            && month.index === this.#path.month
                                            && diary.index === this.#path.date)
                                        .onClick(() => this.#onChangePath(new Path().set().year(year.index).month(month.index).date(diary.index).done()))
                                    )
                                )
                                .child(addDiaryBtn => addDiaryBtn
                                    .key('add')
                                    .onClick(() => {
                                        onClickAddDiary(this.#years, year.index, month.index, this.#onAddDiary)
                                    })
                                    .content('+')
                                )
                            )
                        )
                        .child(addMonthBtn => addMonthBtn
                            .key('add')
                            .onClick(() => {
                                onClickAddMonth(this.#years, year.index, this.#onAddMonth)
                            })
                            .content('+')
                        )
                    )
                )
                .addItem(addYearBtn => addYearBtn
                    .key('add')
                    .onClick(() => {
                        onClickAddYear(this.#years, this.#onAddYear)
                    })
                    .content('+')
                )
                .done()
        )
    }
}

export { Catalog }