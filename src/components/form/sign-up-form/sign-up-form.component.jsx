import { useState, Fragment } from "react";
import FormInput from "../form-input/form-input.component";
import Button from "../../button/button.component";

import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../../utils/firebase.utils";

import Loading from "../../../components/loading/loading.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { displayName, email, password, confirmPassword } = formFields;
  const [loading, setLoading] = useState(false);
  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("passwords do not match");
      return;
    }

    try {
      setLoading(true);
      const { user } = await createAuthUserWithEmailAndPassword(
        email,
        password
      );

      await createUserDocumentFromAuth(user, { displayName });

      resetFormFields();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      if (error.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use");
      }

      if (error.code === "auth/weak-password") {
        alert("password should be at least 6 characters");
      }
      if (error.code === "auth/invalid-email") {
        alert(
          "the value provided for the email user property is invalid. Must be a string email address"
        );
      } else {
        console.log("user creation encountered an error", error);
      }
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  };

  return (
    <Fragment>
      {loading && <Loading />}

      <div className="sign-up-container">
        <h2>Don't have an account ?</h2>
        <span>Sign up with your email and password .</span>
        <form onSubmit={handleSubmit}>
          <FormInput
            label="Display Name"
            type="text"
            required
            onChange={handleChange}
            name="displayName"
            value={displayName}
          />

          <FormInput
            label="Email"
            type="email"
            required
            onChange={handleChange}
            name="email"
            value={email}
          />

          <FormInput
            label="Password"
            type="password"
            required
            onChange={handleChange}
            name="password"
            value={password}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            required
            onChange={handleChange}
            name="confirmPassword"
            value={confirmPassword}
          />
          <Button type="submit">Sign Up</Button>
        </form>
      </div>
    </Fragment>
  );
};

export default SignUpForm;
