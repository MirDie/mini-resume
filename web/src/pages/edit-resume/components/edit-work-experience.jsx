import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import {DatePicker,LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/zh-cn';
import {Divider,Stack, Typography} from "@mui/material";
import MDEditor from '@uiw/react-md-editor';

export default function EditWorkExperience(params) {
    const [open, setOpen] = React.useState(false);
    const [mdvalue, setmdValue] = React.useState("");
    const {onChange} = params;
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const startRef = React.useRef();
    const endRef = React.useRef();
    const handleSubmit = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const formData = Object.fromEntries(form.entries());
        onChange(formData);
        formData.start = startRef.current.value;
        formData.end = endRef.current.value;
        formData.content = mdvalue;
        setOpen(false);
    }

    return (
        <div>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={"zh-cn"}>
                <Button variant="outlined" onClick={handleClickOpen}>
                    添加
                </Button>
                <Dialog open={open} onClose={handleClose}>
                    <form onSubmit={handleSubmit}>
                        <DialogTitle fullWid th={true}>添加工作经历</DialogTitle>
                        <DialogContent>
                            <Stack spacing={2}>
                                <TextField label="公司" name="companyName"/>
                                <Stack direction="row" spacing={2}>
                                    <DatePicker inputRef={startRef} label={"开始时间"}/>
                                    <DatePicker inputRef={endRef} label={"结束时间"}></DatePicker>
                                </Stack>
                                <Stack direction="row" spacing={6}>
                                    <TextField label="部门" name="department"/>
                                    <TextField label="职位" name="position"/>
                                </Stack>
                                <Divider>
                                    <Typography variant="h7" gutterBottom>
                                        工作内容
                                    </Typography>
                                </Divider>
                                <Stack>
                                    <MDEditor
                                        value={mdvalue}
                                        onChange={setmdValue}
                                    />
                                </Stack>
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