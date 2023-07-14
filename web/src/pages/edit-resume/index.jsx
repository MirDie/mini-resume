import HeadBarComponent from "./components/head-bar.jsx";
import Grid from "@mui/material/Unstable_Grid2";
import PreviewResume from "./components/preview.jsx";
import "./index.css";

import EditInfoComponent from "./components/edit-info.jsx";
import { useFormik } from "formik";
import React, { useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

import { useContext } from "react";

const EditResumePage = () => {
  const {resumeInfo} = useContext(AuthContext);
  let initValues ={...resumeInfo};
  const baseInfoForm = useFormik({
    initialValues: initValues,
    validate: (values) => {},
    onSubmit: (values) => {},
  });
  useEffect(() => {
     // 清空baseInfoForm的值
     baseInfoForm.resetForm();
    // 在这里更新formik的值
    baseInfoForm.setValues(resumeInfo)
  }, [resumeInfo])


  return (
    <>
      <HeadBarComponent baseInfoForm={baseInfoForm}></HeadBarComponent>
      <div className="editResumeContainer">
        <Grid container spacing={2} mt={2}>
          <Grid item="true" xs={3} ml={2}>
            <EditInfoComponent baseInfoForm={baseInfoForm}></EditInfoComponent>
          </Grid>
          <Grid item="true" xs={8}>
            <div className="preview">
              <PreviewResume baseInfoForm={baseInfoForm}></PreviewResume>
            </div>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default EditResumePage;
