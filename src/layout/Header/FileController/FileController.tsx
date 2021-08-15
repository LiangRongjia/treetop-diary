import React, { useState } from "react";
import TextEditor, { TextEditorCtx } from "../../../components/TextEditor/TextEditor";
import { Data } from "../../../types";

import styles from "./FileController.module.css"

const FileController:
    React.FC<{
        fileName: string,
        onFileNameChange: (newBookName: string) => void,
        onImportFile: (file: string) => void,
        onExportFile: () => void
    }> = ({
        fileName,
        onFileNameChange,
        onImportFile,
        onExportFile
    }) => {

        const [editable, setEditable] = useState(false)

        const isFileNameValid = (name: string) => {
            return name !== ''
        }

        const exitEditting = () => {

            document.removeEventListener('click', exitEditting)
            setEditable(false)
        }

        const enterEditting = (ele: HTMLDivElement, e: Event) => {
            e.stopPropagation()
            document.addEventListener('click', exitEditting)
            setEditable(true)
            setTimeout(() => {
                ele.focus()
            })
        }

        const _onClick = (ctx: TextEditorCtx) => {
            if (!editable) {
                ctx.evt && ctx.ele && enterEditting(ctx.ele, ctx.evt.nativeEvent)
            } else {
                ctx.evt?.stopPropagation()
            }
        }

        const _onDisabled = (ctx: TextEditorCtx) => {
            const newFileName = ctx.text
            if (isFileNameValid(newFileName)) {
                onFileNameChange(newFileName)
            } else {
                ctx.setTextContent(fileName)
            }
        }

        const _onImport = () => {
            onImportFile(JSON.stringify(new Data()))
        }

        const _onExport = () => {
            onExportFile()
        }

        return (
            <div className={styles.file_controller}>
                <TextEditor
                    className={styles.name_editor}
                    defaultText={fileName}
                    placeholder="日记本名"
                    disabled={!editable}
                    onClick={_onClick}
                    onDisabled={_onDisabled}
                />
                <label className={styles.import}>
                    <input id="file_import" className={styles.file_input_control} type="file"></input>
                    <div>导入</div>
                </label>
                <div className={styles.export} onClick={_onExport}>导出</div>
            </div >
        )
    }

export default FileController