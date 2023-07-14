import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {DatePicker, DateTimePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs'
import 'dayjs/locale/zh-cn';
import {DemoItem} from "@mui/x-date-pickers/internals/demo";
import {FormControl, Select, Stack} from "@mui/material";
import MenuItem from "@mui/material/MenuItem";

export default function EditEduExperience(params) {
    const [open, setOpen] = React.useState(false);
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
                        <DialogTitle fullWid th={true}>添加教育信息</DialogTitle>
                        <DialogContent>
                            <Stack spacing={2}>
                                <TextField label="学校" name="school"/>

                                <Stack direction="row" spacing={2}>
                                    <DemoItem>
                                        <DatePicker inputRef={startRef} label={"入学时间"}
                                        />
                                    </DemoItem>
                                    <DatePicker inputRef={endRef} label={"毕业时间"}></DatePicker>
                                </Stack>
                                <Stack direction="row" spacing={6}>
                                    <TextField label="专业" name="major"/>
                                    <FormControl sx={{m: 1, minWidth: 120}}>
                                        <Select
                                            name="degree"
                                            id="degree"
                                            label="学历"
                                        >
                                            <MenuItem value={"-"}>无</MenuItem>
                                            <MenuItem value={"博士"}>博士</MenuItem>
                                            <MenuItem value={"硕士"}>硕士</MenuItem>
                                            <MenuItem value={"本科"}>本科</MenuItem>
                                            <MenuItem value={"大专"}>大专</MenuItem>
                                            <MenuItem value={"高中"}>高中</MenuItem>
                                        </Select>
                                    </FormControl>
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