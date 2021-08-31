import React, { createRef, useEffect } from "react"
import { Dialog } from "../../components/Dialog/Dialog"
import MUIButton from "@material-ui/core/Button"
import DialogContentText from "@material-ui/core/DialogContentText"
import TextField from "@material-ui/core/TextField"

const ExportDialog:
    React.FC<{
        defaultPassword: string,
        show: boolean,
        hide: () => void,
        onExport: (password: string) => void
    }> = ({
        defaultPassword,
        show,
        hide,
        onExport
    }) => {

        const inputEleRef = createRef<HTMLInputElement>()

        const _onOkClick = () => {
            inputEleRef.current && onExport(inputEleRef.current.value)
            hide()
        }

        const _onCancelClick = () => {
            inputEleRef.current && (inputEleRef.current.value = '')
            hide()
        }

        useEffect(() => {
            setTimeout(() => {
                show === true
                    && inputEleRef.current
                    && (inputEleRef.current.value = defaultPassword)
            })
        }, [show])

        return (
            <Dialog
                show={show}
                title='设置密码'
                content={
                    <>
                        <DialogContentText>以下自动填充当前密码，如无需修改，请直接确认导出。</DialogContentText>
                        <TextField
                            ref={inputEleRef}
                            type="password"
                            size='small'
                            autoFocus
                            margin="dense">
                        </TextField>
                    </>
                }
                footer={
                    <>
                        <MUIButton onClick={_onOkClick} variant="contained">确定</MUIButton>
                        <MUIButton onClick={_onCancelClick}>取消</MUIButton>
                    </>
                }
                onDismiss={_onCancelClick}
            />
        )
    }

export default ExportDialog