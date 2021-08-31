import { TreeViewData } from "../../components/TreeView/data"
import { TreeItemData } from "../../components/TreeView/TreeItem/data"
import { Diary, Month, Path, Year } from "../../types"

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

const getCatalogData = (props: {
    years: Year[],
    path: Path,
    onChangePath: (path: Path) => void,
    onAddDiary: (path: Path) => void,
    onAddMonth: (path: Path) => void,
    onAddYear: (path: Path) => void
}) => {
    const {
        years,
        path,
        onChangePath,
        onAddDiary,
        onAddMonth,
        onAddYear
    } = props


    const diaryToItemData = (diary: Diary, month: Month, year: Year) => (
        TreeItemData.new()
            .key(`${diary.index}`)
            .content(`${diary.index} ${diary.title}`)
            .active(year.index === path.year && month.index === path.month && diary.index === path.date)
            .onClick(() => onChangePath(new Path().set().year(year.index).month(month.index).date(diary.index).done()))
            .done()
    )

    const monthToItemData = (month: Month, year: Year) => (
        TreeItemData.new()
            .key(`${month.index}`)
            .content(`${month.index} ${month.title}`)
            .active(year.index === path.year && month.index === path.month && path.date === Infinity)
            .onClick(() => onChangePath(new Path().set().year(year.index).month(month.index).done()))
            .children(month.diarys.map(diary => diaryToItemData(diary, month, year)))
            .children([
                TreeItemData.new()
                    .key('add')
                    .onClick(() => { onClickAddDiary(years, year.index, month.index, onAddDiary) })
                    .content('+')
                    .done()
            ])
            .done()
    )

    const yearToItemData = (year: Year) => (
        TreeItemData.new()
            .key(`${year.index}`)
            .content(`${year.index} ${year.title}`)
            .active(year.index === path.year && path.month === Infinity)
            .onClick(() => onChangePath(new Path().set().year(year.index).done()))
            .children(year.months.map(month => monthToItemData(month, year)))
            .children([
                TreeItemData.new()
                    .key('add')
                    .onClick(() => { onClickAddMonth(years, year.index, onAddMonth) })
                    .content('+')
                    .done()
            ])
            .done()
    )

    return TreeViewData.new()
        .items(years.map(year => yearToItemData(year)))
        .items([
            TreeItemData.new()
                .key('add')
                .onClick(() => { onClickAddYear(years, onAddYear) })
                .content('+')
                .done()
        ])
        .done()
}

export { getCatalogData }