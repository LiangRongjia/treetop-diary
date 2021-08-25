import { useState } from "react"
import { Data, Diary, Month, Path, Year } from "../types"
import { slimData } from "../utils/utils"
import { exportFile, parseFile } from "./importAndExport"

const useApp = () => {

    const [data, setData] = useState(new Data())

    const [editorHandle, setEditorHandle] = useState(0)
    const [passwordDialogShow, setPasswordDialogShow] = useState(false)
    const [exportDialogShow, setExportDialogShow] = useState(false)

    const [path, setPath] = useState(new Path())

    const [fileBuffer, setFileBuffer] = useState('')

    const years = data.years || []
    const activeYear = years.filter(y => y.index === path.year).shift()
    const months = activeYear?.months || []
    const activeMonth = months.filter(m => m.index === path.month).shift()
    const diarys = activeMonth?.diarys || []
    const activeDiary = diarys.filter(d => d.index === path.date).shift()

    const yearIndexs = years.map(y => y.index)
    const bookName = data.bookName

    /** 若当前年份不合法，选择合法的第一个年份 */
    if (years.length !== 0
        && !(years.map(year => year.index).includes(path.year))) {
        setPath(new Path()
            .set()
            .year(years.map(year => year.index).shift() || Infinity)
            .done()
        )
    }

    /** 分析编辑区将要编辑 日记、月份 还是 年份。 */
    const edittingType = path.year === Infinity
        ? 'none'
        : path.month === Infinity
            ? 'year'
            : path.date === Infinity
                ? 'month'
                : 'diary'

    /** data 变更所触发的回调，放在对象里，自然形成分组，有较好的可读性。 */
    const onChanges = {
        year: {
            title: (newTitle: string) => {
                activeYear && (activeYear.title = newTitle)
                setData({ ...data })
            },
            tags: (newTags: string[]) => {
                activeYear && (activeYear.tags = newTags)
                setData({ ...data })
            },
            summary: (newSummary: string) => {
                activeYear && (activeYear.summary.data = newSummary)
                setData({ ...data })
            }
        },
        month: {
            title: (newTitle: string) => {
                activeMonth && (activeMonth.title = newTitle)
                setData({ ...data })
            },
            tags: (newTags: string[]) => {
                activeMonth && (activeMonth.tags = newTags)
                setData({ ...data })

            },
            summary: (newSummary: string) => {
                activeMonth && (activeMonth.summary.data = newSummary)
                setData({ ...data })
            }
        },
        diary: {
            title: (newTitle: string) => {
                if (activeDiary === undefined) return
                activeDiary.title = newTitle
                setData({ ...data })
            },
            tags: (newTags: string[]) => {
                if (activeDiary === undefined) return
                activeDiary.tags = newTags
                setData({ ...data })

            },
            content: (newContent: string) => {
                if (activeDiary === undefined) return
                activeDiary.content.data = newContent
                setData({ ...data })
            }
        }
    }

    /** 编辑区需要的参数，包括初始化值以及变更事件触发的回调。 */
    const editTarget = {
        title: edittingType === 'year'
            ? activeYear?.title || ''
            : edittingType === 'month'
                ? activeMonth?.title || ''
                : edittingType === 'diary'
                    ? activeDiary?.title || ''
                    : '',
        tags: edittingType === 'year'
            ? activeYear?.tags || []
            : edittingType === 'month'
                ? activeMonth?.tags || []
                : edittingType === 'diary'
                    ? activeDiary?.tags || []
                    : [],
        content: edittingType === 'year'
            ? activeYear?.summary.data || ''
            : edittingType === 'month'
                ? activeMonth?.summary.data || ''
                : edittingType === 'diary'
                    ? activeDiary?.content.data || ''
                    : '',
        onTitleChange: edittingType === 'year'
            ? onChanges.year.title
            : edittingType === 'month'
                ? onChanges.month.title
                : edittingType === 'diary'
                    ? onChanges.diary.title
                    : (() => { }),
        onTagsChange: edittingType === 'year'
            ? onChanges.year.tags
            : edittingType === 'month'
                ? onChanges.month.tags
                : edittingType === 'diary'
                    ? onChanges.diary.tags
                    : (() => { }),
        onContentChange: edittingType === 'year'
            ? onChanges.year.summary
            : edittingType === 'month'
                ? onChanges.month.summary
                : edittingType === 'diary'
                    ? onChanges.diary.content
                    : (() => { }),
        titleEditorPlaceholder: edittingType === 'year'
            ? '年度总结标题'
            : edittingType === 'month'
                ? '月度总结标题'
                : edittingType === 'diary'
                    ? '日记标题'
                    : ''
    }

    const onBookNameChange = (newBookName: string) => {
        setData({ ...data, bookName: newBookName })
    }

    const onImportFile = (file: string) => {
        setFileBuffer(file)
        setPasswordDialogShow(true)
    }

    const onHeaderExportFile = () => {
        setExportDialogShow(true)
    }

    const hidePasswordDialog = () => {
        setPasswordDialogShow(false)
    }

    const verifyPassword = (password: string) => {
        try {
            const newData = parseFile(fileBuffer, password)
            if (typeof newData === 'object'
                && password === newData.password) {
                setData(newData)
            }
        } catch (e) {
            setData(new Data())
        }
        setEditorHandle(pre => pre + 1)
        setFileBuffer('')
    }

    const hideExportDialog = () => {
        setExportDialogShow(false)
    }

    const dialogExportFile = (password: string) => {
        const newData = {
            ...data,
            password
        }
        setData(newData)
        exportFile(newData)
    }

    const changePath = (path: Path) => {
        setPath(path)
        setEditorHandle(e => e + 1)
    }

    const onAddDiary = (path: Path) => {
        const newData = { ...data }
        newData.years.filter(year => year.index === path.year)
            .forEach(year => {
                year.months.filter(month => month.index === path.month)
                    .forEach(month => {
                        if (month.diarys.some(diary => diary.index === path.date)) {
                            console.warn(`onAddDiary dateIdx=${path.date} 已存在`)
                            return
                        }
                        month.diarys.push(new Diary(path.date))
                        month.diarys.sort((a, b) => a.index - b.index)
                        setData(_ => newData)
                        changePath(new Path().set().year(path.year).month(path.month).date(path.date).done())
                    })
            })
    }

    const onAddMonth = (path: Path) => {
        const newData = { ...data }
        newData.years.filter(year => year.index === path.year)
            .forEach(year => {
                if (year.months.some(m => m.index === path.month)) {
                    console.warn(`onAddDiary dateIdx=${path.month} 已存在`)
                    return
                }
                year.months.push(new Month(path.year, path.month))
                year.months.sort((a, b) => a.index - b.index)
                setData(_ => newData)
                changePath(new Path().set().year(path.year).month(path.month).done())
            })
    }

    const onAddYear = (path: Path) => {
        const newData = { ...data }
        if (newData.years.some(y => y.index === path.year)) {
            console.warn(`onAddDiary dateIdx=${path.year} 已存在`)
            return
        }
        newData.years.push(new Year(path.year))
        newData.years.sort((a, b) => a.index - b.index)
        setData(_ => newData)
        changePath(new Path().set().year(path.year).done())
    }

    return {
        yearIndexs,
        years,
        months,
        diarys,
        path,
        activeDiaryIndex: path.date,
        activeMonthIndex: path.month,
        activeYearIndex: path.year,
        editTarget,
        editorHandle,
        bookName,
        passwordDialogShow,
        password: data.password,
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
        onAddYear
    }
}

export default useApp