import React, { createRef, useEffect, useState } from "react"
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

        const [currentPassword, setCurrentPassword] = useState(defaultPassword)

        const _onOkClick = () => {
            onExport(currentPassword)
            setCurrentPassword('')
            hide()
        }

        const _onCancelClick = () => {
            setCurrentPassword('')
            hide()
        }

        const _onInput = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
            setCurrentPassword(e.target.value)
        }

        return (
            <Dialog
                show={show}
                title='设置密码'
                content={
                    <>
                        <DialogContentText>以下自动填充当前密码，如无需修改，请直接确认导出。</DialogContentText>
                        <TextField
                            value={currentPassword}
                            type="password"
                            size='small'
                            autoFocus
                            margin="dense"
                            onChange={e => { _onInput(e) }}>
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