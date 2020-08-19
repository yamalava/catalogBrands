import React from 'react'
import TextField from '@material-ui/core/TextField'

function CustomTextField(date) {
    return (
        <TextField
                {...date}
                margin="dense"
                fullWidth
            />
    )
}

export default CustomTextField;