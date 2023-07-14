import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
  Select,
  FormControl,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  InputLabel,
} from "@mui/material";
import React, { useContext } from "react";
import MenuItem from "@mui/material/MenuItem";
import EditEduExperience from "./edit-edu-experience";
import { Close } from "@mui/icons-material";
import EditWorkExperience from "./edit-work-experience";
import EditTechnologyStack from "./edit-technology-stack";
import axios from "axios";
import message from "../../../unit/message";
import { AuthContext } from "../../../context/AuthContext";
import {formatUserInfoFromResponse} from "../../../unit/userInfoHelp"
import localUnits from "../../../unit/localStorageUnits";
export default function EditInfoComponent(params) {
  const [expanded, setExpanded] = React.useState(false);
  const { isLoggedIn, userInfo } = useContext(AuthContext);
  const { baseInfoForm } = params;
  console.log("EditInfoComponent", baseInfoForm);
  const setFieldValue = baseInfoForm.setFieldValue;
  const handleChangeExpand = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  // 创建自定义主题
  const theme = createTheme({
    components: {
      MuiTextField: {
        defaultProps: {
          size: "small", // 设置输入框大小为小号
          variant: "outlined",
          InputLabelProps:{
            shrink: true,
          }
        },
      },
      InputLabel: {
        defaultProps: {
          shrink: true,
        }
      },
      MuiSelect: {
        defaultProps: {
          size: "small", // 设置输入框大小为小号
          variant: "outlined",
        },
      },
    },
  });
  const handleSaveClick = function (e) {
    const values = baseInfoForm.values;
    let body = {
      email: values.email,
      username: values.username,
      college: values.college,
      intendedJob: values.intendedJob,
      phone: values.phone,
      address: values.address,
      age: Number(values.age),
      sex: values.sex,
      qualification: values.qualification,
      itemDetails: [
        {
          ItemType: "education",
          Name: "教育经历",
          Detail: JSON.stringify(values.education),
          ID:values.educationID,

        },
        {
          ItemType: "technologyStack",
          Name: "技术栈",
          Detail: JSON.stringify(values.technologyStack),
          ID:values.technologyStackID
        },
        {
          ItemType: "workExperience",
          Name: "工作经历",
          Detail: JSON.stringify(values.workExperience),
          ID:values.workExperienceID
        },
      ],
    };
    if (isLoggedIn) {
      axios.post(`resume/${userInfo.ID}`, body).then((response) => {
        if(response.data.success){
          localUnits.setResumeInfo(formatUserInfoFromResponse(response.data.data));
        }
      });
    }
    localUnits.setResumeInfo(values);
    message.success({ content: "保存成功" });
  };

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Accordion >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%",}}>
              基础信息
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                label="姓名"
                {...baseInfoForm.getFieldProps("username")}
              />
              <TextField
                label="应聘岗位"
                {...baseInfoForm.getFieldProps("intendedJob")}
              />
              <TextField
                label="邮箱"
                {...baseInfoForm.getFieldProps("email")}
              />
              <TextField
                label="电话"
                {...baseInfoForm.getFieldProps("phone")}
              />

              <TextField inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}  label="年龄" {...baseInfoForm.getFieldProps("age")} />
              <FormControl sx={{ m: 1, minWidth: 120 }}  >
                <Select
                  label="学历"
                  {...baseInfoForm.getFieldProps("qualification")}
                >
                  <MenuItem key={"学历-"} value={"-"}>无</MenuItem>
                  <MenuItem key={"博士"} value={"博士"}>博士</MenuItem>
                  <MenuItem  key={"硕士"} value={"硕士"}>硕士</MenuItem>
                  <MenuItem key={"本科"} value={"本科"} >本科</MenuItem>
                  <MenuItem key={"大专"} value={"大专"}>大专</MenuItem>
                  <MenuItem key={"高中"} value={"高中"}>高中</MenuItem>
                </Select>
              </FormControl>
              <FormControl  label="性别" sx={{ m: 1, minWidth: 120 }} aria-label={"213"}>
                <Select label="性别" {...baseInfoForm.getFieldProps("sex")}>
                  <MenuItem key={"性别-"} value={"-"}>无</MenuItem>
                  <MenuItem key={"男"} value={"男"}>男</MenuItem>
                  <MenuItem key={"女"} value={"女"}>女</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </AccordionDetails>
        </Accordion>
        <Accordion>
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              教育经历
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box>
            <List>
              {baseInfoForm.values &&
                baseInfoForm.values.education &&
                baseInfoForm.values.education.map((education,index) => {
                  return (
                    <ListItem key={"education" + index }>
                      <ListItemText primary={education.school} />
                      <ListItemIcon
                        onClick={() =>
                          setFieldValue(
                            "education",
                            baseInfoForm.values.education.filter(
                              (item) => item !== education
                            )
                          )
                        }
                      >
                        <Button>
                          <Close />
                        </Button>
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
            </List>
            <EditEduExperience
              onChange={(newEducation) => {
                const educations = [
                  ...baseInfoForm.values.education,
                  newEducation,
                ];
                setFieldValue("education", educations);
              }}
              educationObject={{
                school: "1",
                major: "2",
                start: "",
                end: "",
              }}
            ></EditEduExperience>
          </AccordionDetails>
        </Accordion>

        <Accordion >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>
              工作经历
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box>
            <List>
              {baseInfoForm.values &&
                baseInfoForm.values.workExperience &&
                baseInfoForm.values.workExperience.map((workEx, index) => {
                  return (
                    <ListItem key={"workEx"+index}>
                      <ListItemText primary={workEx.companyName} />
                      <ListItemIcon
                        onClick={() =>
                          setFieldValue(
                            "workExperience",
                            baseInfoForm.values.workExperience.filter(
                              (item) => item !== workEx
                            )
                          )
                        }
                      >
                        <Button>
                          <Close />
                        </Button>
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
            </List>
            <EditWorkExperience
              onChange={(newWorkEx) => {
                const educations = [
                  ...baseInfoForm.values.workExperience,
                  newWorkEx,
                ];
                setFieldValue("workExperience", educations);
              }}
              educationObject={{}}
            ></EditWorkExperience>
          </AccordionDetails>
        </Accordion>

        <Accordion >
          <AccordionSummary
            aria-controls="panel1bh-content"
            id="panel1bh-header"
          >
            <Typography sx={{ width: "33%", flexShrink: 0 }}>技术栈</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "20ch" },
              }}
              noValidate
              autoComplete="off"
            ></Box>
            <List>
              {baseInfoForm.values &&
                baseInfoForm.values.technologyStack &&
                baseInfoForm.values.technologyStack.map((stack, index) => {
                  return (
                    <ListItem key={"technologyStack" + index}>
                      <ListItemText primary={index + 1 + ". " + stack} />
                      <ListItemIcon
                        onClick={() =>
                          setFieldValue(
                            "technologyStack",
                            baseInfoForm.values.technologyStack.filter(
                              (item) => item !== stack
                            )
                          )
                        }
                      >
                        <Button>
                          <Close />
                        </Button>
                      </ListItemIcon>
                    </ListItem>
                  );
                })}
            </List>
            <EditTechnologyStack
              onChange={(newTechnologyStack) => {
                const technologyStacks = [
                  ...baseInfoForm.values.technologyStack,
                  newTechnologyStack,
                ];
                setFieldValue("technologyStack", technologyStacks);
              }}
            ></EditTechnologyStack>
          </AccordionDetails>
        </Accordion>
        <Button
          fullWidth={true}
          variant={"contained"}
          style={{ marginTop: "8px" }}
          onClick={handleSaveClick}
        >
          保存
        </Button>
      </div>
    </ThemeProvider>
  );
}
