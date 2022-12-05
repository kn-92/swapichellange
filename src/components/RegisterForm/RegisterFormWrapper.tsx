import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./RegisterFormWrapper.css";

import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { postRegister } from "../../redux/userSlice";

type STAR_WARS_DATA = {
  name: String;
  created: Date;
  vehicles: String[];
};

const RegisterFormWrapper = () => {
  const dispatch = useAppDispatch();
  const state = useAppSelector((state) => state);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    login: "",
    password: "",
    email: "",
    number: "",
    checked: false,
  });
  const [isError, setIsError] = useState({
    login: false,
    password: false,
    email: false,
    number: false,
    checked: false,
    isFormValid: false,
    showErrors: false,
  });
  const inputClasses = {
    inputOk: "input",
    inputError: "input inputError",
    checkboxOk: "checbox",
    checkboxError: "checbox checkboxError",
    notVisible: "notVisible",
  };

  const star_wars_data: STAR_WARS_DATA[] = [];

  state.people.data.forEach((element) => {
    const object: STAR_WARS_DATA = {
      name: element.name,
      created: element.created,
      vehicles: element.vehicles,
    };
    star_wars_data.push(object);
  });
  const validateForm = () => {
    const hasAtChar = formData.email.includes("@");
    let newIsError = {
      login: false,
      password: false,
      email: false,
      number: false,
      checked: false,
      isFormValid: false,
      showErrors: false,
    };
    if (formData.login.length < 5) {
      newIsError = {
        ...newIsError,
        login: true,
        showErrors: true,
      };
    }
    if (formData.password.length < 5) {
      newIsError = {
        ...newIsError,
        password: true,
        showErrors: true,
      };
    }

    if (!hasAtChar) {
      newIsError = {
        ...newIsError,
        email: true,
        showErrors: true,
      };
    }
    if (formData.number.length < 9) {
      newIsError = {
        ...newIsError,
        number: true,
        showErrors: true,
      };
    }
    if (!formData.checked) {
      newIsError = {
        ...newIsError,
        checked: true,
        showErrors: true,
      };
    }
    if (
      !newIsError.login &&
      !newIsError.password &&
      !newIsError.email &&
      !newIsError.number &&
      !newIsError.checked
    )
      newIsError = {
        ...newIsError,
        isFormValid: true,
        showErrors: false,
      };
    setIsError(newIsError);
  };

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.currentTarget.id]: e.currentTarget.value,
      checked: e.currentTarget.checked,
    });
  };

  const sendRequest = () => {
    if (isError.isFormValid) {
      dispatch(
        postRegister({
          data: {
            starWarsData: star_wars_data,
            userRegisterData: formData,
          },
        })
      );
      navigate("/");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    validateForm();
  };
  useEffect(() => {
    sendRequest();
  }, [isError.isFormValid]);

  return (
    <div className="RegisterFormWrapper">
      <p className="title">FORMULARZ REJESTRACYJNY</p>
      <form className="form" onSubmit={handleSubmit}>
        <label className="label" htmlFor="login">
          Login:
        </label>
        <input
          onChange={handleChange}
          value={formData.login}
          className={
            isError.showErrors && isError.login
              ? inputClasses.inputError
              : inputClasses.inputOk
          }
          type="text"
          id="login"
        />
        <div
          className={
            isError.showErrors && isError.login
              ? "loginMessage"
              : inputClasses.notVisible
          }
        >
          Login musi zawierać co najmniej 5 znaków
        </div>
        <label className="label" htmlFor="password">
          Hasło:
        </label>
        <input
          onChange={handleChange}
          value={formData.password}
          className={
            isError.showErrors && isError.password
              ? inputClasses.inputError
              : inputClasses.inputOk
          }
          type="password"
          id="password"
        />
        <div
          className={
            isError.showErrors && isError.password
              ? "passwordMessage"
              : inputClasses.notVisible
          }
        >
          Hasło musi zawierać co najmniej 5 znaków
        </div>
        <label className="label" htmlFor="email">
          E-mail:
        </label>
        <input
          onChange={handleChange}
          value={formData.email}
          className={
            isError.showErrors && isError.email
              ? inputClasses.inputError
              : inputClasses.inputOk
          }
          type="email"
          id="email"
        />
        <div
          className={
            isError.showErrors && isError.email
              ? "emailMessage"
              : inputClasses.notVisible
          }
        >
          Nieprawidłowy format adresu e-mail
        </div>
        <label className="label" htmlFor="number">
          Numer telefonu:
        </label>
        <input
          onChange={handleChange}
          value={formData.number}
          className={
            isError.showErrors && isError.number
              ? inputClasses.inputError
              : inputClasses.inputOk
          }
          type="number"
          id="number"
        />
        <div
          className={
            isError.showErrors && isError.number
              ? "numberMessage"
              : inputClasses.notVisible
          }
        >
          Nieprawidłowy numer telefonu
        </div>
        <div className="checkboxWrapper">
          <label className="label" htmlFor="checkbox">
            <input
              onChange={handleChange}
              checked={formData.checked}
              className={
                isError.showErrors && isError.checked
                  ? inputClasses.checkboxError
                  : inputClasses.checkboxOk
              }
              type="checkbox"
            />
            <span className="checkmark"></span>
            Akceptuję regulamin
          </label>
          <div
            className={
              isError.showErrors && isError.checked
                ? "checkboxMessage"
                : inputClasses.notVisible
            }
          >
            Wymagana akceptacja regulaminu
          </div>
        </div>

        <div className="btnWrapper">
          <button className="submit" type="submit">
            zapisz
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegisterFormWrapper;
