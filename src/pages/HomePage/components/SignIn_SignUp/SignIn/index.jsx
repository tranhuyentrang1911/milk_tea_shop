import { FastField, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";

import svga from "assets/svg";
import { signInThunk } from "redux/slices/usersSlice";

import InputField from "../components/InputField";
import styles from "../signIn.module.scss";

const SignIn = () => {
  const initialValues = {
    phone2: "",
    pass2: "",
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const validationSchema = Yup.object().shape({
    phone2: Yup.string()
      .required("Vui lòng nhập số điện thoại!")
      .matches(phoneRegExp, "Số điện thoại không đúng định dạng!"),
    pass2: Yup.string()
      .required("Vui lòng nhập mật khẩu!")
      .min(8, "Mật khẩu tối thiểu 8 ký tự!"),
  });

  const handleCloseForm = () => {
    const form = document.querySelector("#formSignIn");
    form.style.display = "none";
  };
  const handleSubmit = (values) => {
    const user = { phone: values.phone2, pass: values.pass2 };

    const login = async () => {
      try {
        await dispatch(signInThunk(user));
        navigate("/order");
      } catch (error) {}
    };
    login();
  };

  return (
    <div className={styles.modal} id="formSignIn" onClick={handleCloseForm}>
      <div
        className={styles.main}
        style={{ height: "380px" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.logo}>
          <img src={require("assets/images/logo/logo_2.png")} alt="" />
        </div>
        <div className={styles.close} onClick={handleCloseForm}>
          <button>{svga.close}</button>
        </div>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formikProps) => {
            const { values, errors, touched, isSubmitting } = formikProps;

            // console.log({ values, errors, touched });
            return (
              <Form className={styles.form}>
                <h2> Đăng nhập tài khoản Phúc Long</h2>

                <FastField
                  name="phone2"
                  component={InputField}
                  placeholder="Số điện thoại*"
                />
                <FastField
                  name="pass2"
                  type="password"
                  component={InputField}
                  placeholder="Mật khẩu*"
                />

                <div className={styles.form_group}>
                  <button type="submit">Đăng nhập</button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </div>
    </div>
  );
};

export default SignIn;
