import React from "react"

import MUIDialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

const Dialog: React.FC<{
    title: string
    content: JSX.Element
    footer: JSX.Element
    show: boolean
    onDismiss: () => void
}> = ({
    content = [],
    footer = [],
    show = true,
    title = '标题',
    onDismiss = () => { }
}) => {

        return (
            <div style={{ position: 'fixed' }}>
                <MUIDialog open={show} onClose={onDismiss}>
                    <DialogTitle>{title}</DialogTitle>
                    <DialogContent>
                        {content}
                    </DialogContent>
                    <DialogActions>
                        {footer}
                    </DialogActions>
                </MUIDialog>
            </div>
        )
    }

export { Dialog }