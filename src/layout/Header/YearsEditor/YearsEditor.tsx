import React, { useState } from "react"
import TextEditor, { TextEditorCtx } from "../../../components/TextEditor/TextEditor"

import styles from "./YearsEditor.module.css"

/**
 * 年编辑器逻辑
 * 1. 单击编辑框
 *    1. 非编辑状态下，重选年份
 *    2. 编辑状态下，默认行为
 * 2. 双击编辑框
 *    1. 非编辑状态下，进入编辑状态
 *    2. 编辑状态下，默认行为
 * 3. 单击编辑框外
 *    1. 非编辑状态下，默认行为
 *    2. 编辑状态下，退出编辑状态
 * 4. 单击下拉按钮
 *    1. 非下拉状态下，下拉
 *    2. 下拉状态下，任何点击都关闭下拉状态
 */
const YearsEditor2:
    React.FC<{
        activeYearIndex: number,
        yearIndexs: number[],
        onEditYearIndex: (oldIndex: number, newIndex: number) => void,
        onSelectYear: (yearIndex: number) => void,
        onDeleteYear: (yearIndex: number) => void,
        onAddYear: (yearIndex: number) => void
    }> = ({
        activeYearIndex,
        yearIndexs,
        onEditYearIndex,
        onSelectYear,
        onDeleteYear,
        onAddYear
    }) => {

        /** 标记是否显示下拉列表 */
        const [dropdownShow, setDropdownShow] = useState(false)

        /** 标记是否正在编辑 */
        const [editable, setEditable] = useState(false)

        /** 非选中年份 */
        const inactiveYearIndexs = yearIndexs.filter(i => i !== activeYearIndex)

        /**
         * 退出编辑状态。
         * 1. 取消挂载于 `document` 的监听器（即本回调函数）；
         * 2. 关闭编辑状态。
         */
        const exitEditting = () => {
            document.removeEventListener('click', exitEditting)
            setEditable(false)
        }

        /**
         * 进入编辑状态。
         * 1. 阻止冒泡，防止立即退出编辑；
         * 2. 添加挂载于 `document` 的监听器，以便日后退出编辑状态；
         * 3. 进入编辑状态；
         * 4. 延时添加焦点，立刻添加将被 `React` 过程抢掉焦点。
         */
        const enterEditting = (divEle: HTMLDivElement, e: Event) => {
            e.stopPropagation()
            document.addEventListener('click', exitEditting)
            setEditable(true)
            setTimeout(() => {
                divEle.focus()
            })
        }

        /**
         * 关闭下拉列表。
         * 1. 设置下拉列表显示状态；
         * 2. 删除 `document` 上的监听器（即本回调函数）。
         */
        const closeDropdown = () => {
            document.removeEventListener('click', closeDropdown)
            setDropdownShow(false)
        }

        /**
         * 打开下拉列表。
         * 1. 阻止冒泡，防止立即退出编辑；
         * 2. 设置下拉列表显示状态；
         * 3. 添加 `document` 上的监听器，以日后关闭下拉列表。
         */
        const openDropdown = (e: Event) => {
            e.stopPropagation()
            document.addEventListener('click', closeDropdown)
            setDropdownShow(true)
        }

        /**
         * 当点击添加按钮时执行。
         * 1. 获取实时年份；
         * 2. 找到不与现有年份重复的年份，使用循环自增的方式；
         * 3. 调用上层交给的回调函数，添加一个年份数据。
         */
        const _onAddBtnClick = () => {
            let newYearIndex = (new Date).getFullYear()
            while (yearIndexs.includes(newYearIndex)) {
                newYearIndex++
            }
            onAddYear(newYearIndex)
        }

        /**
         * 当点击删除按钮时执行。
         * 1. 调用上层交付的回调函数，删除当前年份。
         */
        const _onDeleteBtnClick = () => {
            onDeleteYear(activeYearIndex)
        }

        /**
         * 当点击当前选中年份框时执行。
         * 1. 若处在编辑状态，阻止事件冒泡，以防止 `document` 上的监听器取消编辑状态；
         * 2. 若不在编辑状态，调用上层交付的回调函数，选择当前年份。
         * @param ctx `TextEditor` 编辑器提供的 `contex` 对象
         * @param e `React` 鼠标点击事件
         */
        const _onActiveYearClick = (ctx: TextEditorCtx) => {
            if (editable) {
                ctx.evt?.stopPropagation()
            } else {
                onSelectYear(activeYearIndex)
            }
        }

        /**
         * 构造函数，为指定年份的选项构造项点击回调函数。
         * @param index 指定的年份。
         * @returns 当点击指定年份选项时调用的回调函数，即执行上层交付的回调函数，选中指定年份。
         */
        const _onYearOptionClick = (index: number) => () => {
            onSelectYear(index)
        }

        /**
         * 当点击下拉列表按钮时执行。
         * 1. 若未下拉，则下拉
         * 2. 若正在编辑，退出编辑
         * @param e `React` 鼠标事件
         */
        const _onDropdownBtnClick = (e: React.MouseEvent) => {
            !dropdownShow && openDropdown(e.nativeEvent)
            editable && exitEditting()
        }

        /**
         * 当双击当前选中年份框时执行，目标是进入编辑状态。
         * 1. 当在不编辑状态，进入编辑。
         * @param ctx `TextEditor` 提供的 context
         * @param e `React` 的鼠标事件
         */
        const _onActiveYearDoubleClick = (ctx: TextEditorCtx) => {
            !editable
                && ctx.ele
                && ctx.evt
                && enterEditting(ctx.ele, ctx.evt.nativeEvent)
        }

        /**
         * 当退出编辑状态时执行。
         * 1. 若年份合法，调用上层交付的回调函数，设置年份；
         * 2. 若不合法，将编辑器复原
         * @param ctx 
         */
        const _onTextEditorDisabled = (ctx: TextEditorCtx) => {
            const num = parseInt(ctx.text)
            if (`${num}` === ctx.text
                && !isNaN(num)
                && !inactiveYearIndexs.includes(num)) {
                onEditYearIndex(activeYearIndex, num)
            } else {
                ctx.ele && (ctx.ele.textContent = `${activeYearIndex}`)
            }
        }

        console.log('[YearsEditor Render]')

        return (
            <div className={styles.years_editor}>
                <div className={styles.year_options_group}
                    data-show={dropdownShow ? 'true' : 'false'}>
                    {inactiveYearIndexs.length === 0
                        ? <div className={styles.placeholder}>空</div>
                        : inactiveYearIndexs.map(index => (
                            <div key={index}
                                className={styles.year_option}
                                onClick={_onYearOptionClick(index)}>
                                {index}
                            </div>
                        ))}
                </div>
                <TextEditor
                    defaultText={`${activeYearIndex}`}
                    className={styles.active_year}
                    disabled={!editable}
                    onDoubleClick={_onActiveYearDoubleClick}
                    onClick={_onActiveYearClick}
                    onDisabled={_onTextEditorDisabled}
                />
                <div className={styles.dropdown_button}
                    onClick={_onDropdownBtnClick}><div></div></div>
                <div className={styles.delete_button}
                    onClick={_onDeleteBtnClick}></div>
                <div className={styles.add_button}
                    onClick={_onAddBtnClick}></div>
            </div>
        )
    }

export default YearsEditor2