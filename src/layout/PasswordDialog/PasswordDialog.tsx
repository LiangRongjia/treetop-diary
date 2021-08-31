import React, { createRef } from "react"
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

        const inputEleRef = createRef<HTMLInputElement>()

        const _onOkClick = () => {
            inputEleRef.current && verify(inputEleRef.current.value)
            hide()
        }

        const _onCancelClick = () => {
            inputEleRef.current && (inputEleRef.current.value = '')
            hide()
        }

        const _onDismiss = _onCancelClick

        return (
            <Dialog
                show={isShow}
                title={'输入密码'}
                content={
                    <TextField ref={inputEleRef} type="password"></TextField>
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