import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import DialogTitle from '@mui/material/DialogTitle';
import {LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/zh-cn';

import { Stack} from "@mui/material";


export default function EditTechnologyStack(params) {
    const [open, setOpen] = React.useState(false);
    const [technologyStack, setTechnologyStack] = React.useState("");
    const {onChange} = params;
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        onChange(technologyStack);
        setOpen(false);
    }
    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"zh-cn"}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    添加
                </Button>
                <Dialog open={open} onClose={handleClose} >
                    <form onSubmit={handleSubmit}>
                        <DialogTitle fullWid th={true}>添加技术栈</DialogTitle>
                        <DialogContent>
                            <Stack spacing={2}>
                                <TextField label="技术栈" value={technologyStack} style={{width:"400px"}}
                                           onChange={event => setTechnologyStack(event.target.value)}/>
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleClose}>取消</Button>
                            <Button type={"submit"}>保存</Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </LocalizationProvider>
        </div>
    );
}