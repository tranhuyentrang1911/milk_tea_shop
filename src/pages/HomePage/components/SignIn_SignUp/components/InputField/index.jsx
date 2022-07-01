import React from "react";
import styles from "../../signIn.module.scss";

const InputField = (props) => {
  const { field, form, type, label, placeholder, disable } = props;

  const { name, value, onChange, onBlur } = field;
  const { errors, touched } = form;
  const showError = errors[name] && touched[name];
  return (
    <div className={styles.form_group}>
      {label && (
        <label for={name} className={styles.form_label}>
          {label}
        </label>
      )}
      <input
        id={name}
        name={name}
        {...field}
        type={type}
        disabled={disable}
        placeholder={placeholder}
        className={showError ? styles.form_control_active : styles.form_control}
      />
      {showError && (
        <small className={styles.form_message}>{errors[name]}</small>
      )}
    </div>
  );
};

export default InputField;
