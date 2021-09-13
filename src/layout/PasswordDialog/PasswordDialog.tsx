import React, { createRef, useState } from "react"
import { Dialog } from "../../components/Dialog/Dialog"
import MUIButton from "@material-ui/core/Button"
import TextField from "@material-ui/core/TextField"

const PasswordDialog:
    React.FC<{
        isShow: boolean,
        hide: () => void,
        verify: (password: string) => void
    }> = ({
        isShow,
        hide,
        verify
    }) => {

        const [password, setPassword] = useState('')

        const _onOkClick = () => {
            verify(password)
            setPassword('')
            hide()
        }

        const _onCancelClick = () => {
            setPassword('')
            hide()
        }

        const _onDismiss = _onCancelClick

        const _onInput = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setPassword(e.target.value)
        }

        return (
            <Dialog
                show={isShow}
                title={'输入密码'}
                content={
                    <TextField
                        value={password}
                        type="password"
                        onChange={e => { _onInput(e) }}
                    ></TextField>
                }
                footer={
                    <>
                        <MUIButton onClick={_onOkClick} variant="contained" >"确定"</MUIButton>
                        <MUIButton onClick={_onCancelClick}>"取消"</MUIButton>
                    </>
                }
                onDismiss={_onDismiss}
            />
        )
    }

export default PasswordDialog