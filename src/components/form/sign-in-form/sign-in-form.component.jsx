import { useState, Fragment } from "react";

import FormInput from "../../form/form-input/form-input.component";
import Button from "../../button/button.component";

import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopup,
} from "../../../utils/firebase.utils";

import Loading from "../../../components/loading/loading.component";

import "./sign-in-form.styles.scss";

const defaultFormFields = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password } = formFields;
  const [loading, setLoading] = useState(false);

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      setLoading(true);
      await signInAuthUserWithEmailAndPassword(email, password);

      resetFormFields();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      switch (error.code) {
        case "auth/invalid-login-credentials":
          alert("email or password is wrong");
          break;
        case "auth/user-not-found":
          alert("no user associated with this email");
          break;
        default:
          console.log(error);
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
      <div className="sign-in-container">
        <h2>Already have an account ?</h2>
        <span>Sign in with your email and password .</span>
        <form onSubmit={handleSubmit}>
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
          <div className="buttons-container">
            <Button type="submit">Sign In</Button>
            <Button
              buttonType="google"
              type="button"
              onClick={signInWithGoogle}
            >
              Sign In With Google
            </Button>
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default SignInForm;
