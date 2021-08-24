import { TreeView } from "../../components/TreeView/TreeView"
import { Path, Year } from "../../types"
import styles from "./Catalog.module.css"

class Catalog {
    #years: Year[] = []
    #path: Path = new Path()
    #onChangePath: (path: Path) => void = () => { }
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
                                    .content('+')
                                )
                            )
                        )
                        .child(addMonthBtn => addMonthBtn
                            .key('add')
                            .content('+')
                        )
                    )
                )
                .addItem(addYearBtn => addYearBtn
                    .key('add')
                    .content('+')
                )
                .done()
        )
    }
}

export { Catalog }