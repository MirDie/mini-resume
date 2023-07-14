import "./preview.css";
import {
  Divider,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import Grid from "@mui/material/Unstable_Grid2/Grid2";

import React from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";

/*

*/
export default function PreviewResume(params) {
  console.log("preview", "params", params);
  const { baseInfoForm } = params;
  console.log("preview", "baseInfoForm", baseInfoForm);
  const setValue = baseInfoForm.setFieldValue;
  React.useEffect(() => {
    let array = [];
    if (
      baseInfoForm.values.qualification &&
      baseInfoForm.values.qualification !== "" &&
      baseInfoForm.values.qualification !== "-"
    ) {
      array.push(baseInfoForm.values.qualification);
    }

    if (
      baseInfoForm.values.age &&
      baseInfoForm.values.age !== "" &&
      baseInfoForm.values.age !== "-"
    ) {
      array.push(baseInfoForm.values.age + "岁");
    }

    if (
      baseInfoForm.values.sex &&
      baseInfoForm.values.sex !== "" &&
      baseInfoForm.values.sex !== "-"
    ) {
      array.push(baseInfoForm.values.sex);
    }

    if (array.length > 0) {
      setValue("baseinfo", array.join(" | "));
    } else {
      setValue("baseinfo", "");
    }
  }, [baseInfoForm.values, setValue]);
  const Item = function Item(props) {
    return props.value === "" ? (
      <></>
    ) : (
      <>
        <Grid xs={12}>
          <span style={{ textAlign: "center" }}>
            {props.value === "" || props.value === undefined
              ? ""
              : props.name + ":" + props.value}
          </span>
        </Grid>
      </>
    );
  };

  return (
    <>
      <div className="previewContainer">
        <Grid container spacing={1} ml={2}>
          <Grid xs={12} mt={2}>
            <Typography variant="h5" gutterBottom>
              {baseInfoForm.values.username}
            </Typography>
          </Grid>
          <Grid xs={12}>
            <span>{baseInfoForm.values.baseinfo}</span>
          </Grid>

          <Item name="意向岗位" value={baseInfoForm.values.intendedJob}></Item>
          <Item  name="邮箱" value={baseInfoForm.values.email}></Item>
          <Item name="电话号码" value={baseInfoForm.values.phone}></Item>

          {baseInfoForm.values.education &&
            baseInfoForm.values.education.length > 0 && (
              <Grid xs={12}>
                <Divider textAlign="left">
                  <Typography color={"primary"} variant="h7" gutterBottom>
                    教育经历
                  </Typography>
                </Divider>

                {baseInfoForm.values.education.map((o, i) => {
                  return (
                    <>
                      <Stack direction="row"  spacing={6}>
                        <span style={{ minWidth: "25%" }}>{o.school}</span>
                        <span>{o.major}</span>
                        <span>{o.degree}</span>
                        <span>
                          {o.start}-{o.end}
                        </span>
                      </Stack>
                    </>
                  );
                })}
              </Grid>
            )}

          {baseInfoForm.values.workExperience &&
            baseInfoForm.values.workExperience.length > 0 &&
            baseInfoForm.values.workExperience.map((o, i) => {
              return (
                <>
                  <Grid xs={12} >
                    <Divider textAlign="left">
                      <Typography variant="h7" color={"primary"}  gutterBottom>
                        工作经历
                      </Typography>
                    </Divider>
                    <Stack direction="row" spacing={6}>
                      <span>{o.companyName}</span>
                      <span>{o.department}</span>
                      <span>{o.position}</span>
                      <span>
                        {o.start}-{o.end}
                      </span>
                    </Stack>
                  </Grid>
                  <Grid xs={12}>
                    <MarkdownPreview
                      wrapperElement={{
                        "data-color-mode": "light",
                      }}
                      source={o.content}
                    />
                  </Grid>
                </>
              );
            })}

          {baseInfoForm.values.technologyStack &&
            baseInfoForm.values.technologyStack.length > 0 && (
              <Grid xs={12}>
                <Divider textAlign="left">
                  <Typography variant="h7" color={"primary"}  gutterBottom>
                    技术栈
                  </Typography>
                </Divider>
                <List>
                  {baseInfoForm.values.technologyStack.map((o, i) => (
                    <ListItem key={"technologyStack" + i}>
                      <span>
                        <span style={{ fontWeight: "450" }}>{i + 1}. </span>
                        <span>{o}</span>
                      </span>
                    </ListItem>
                  ))}
                </List>
              </Grid>
            )}
        </Grid>
      </div>
    </>
  );
}
