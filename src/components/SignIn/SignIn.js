import React, { useState } from "react";
import "./SignIn.css";
import Logo from "../../images/SignIn/logo.svg";
import { useNavigate } from "react-router-dom";
import Err from "../../images/SignIn/err.svg";
import BtnBack from "../../images/SignIn/btnBack.svg";
import SignInPopup from "../SignInPopup/SignInPopup";
import SignInIcon from "../../images/SignIn/signin.svg";
import PassInput from "../../images/SignIn/passwordInput.svg";
import LoginInput from "../../images/SignIn/loginInput.svg";
import { vandalAuth } from "../../utils/Auth";

function SignIn() {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    LoginInput: "",
    PasswordInput: "",
  });

  const [isQuestOpen, setIsQuestOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isClosingStart, setIsClosingStart] = useState(false);
  const [isFormStart, setIsFormStart] = useState(false);
  const [isFirstForm, setIsFirstForm] = useState(false);

  function handleOpenQuest() {
    setIsQuestOpen(true);
  }
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }
  function handleNavLinkClick() {
    setIsClosingStart(true);
    setTimeout(() => {
      navigate("/");
    }, 1000); // Замените 1000 на продолжительность вашей анимации в миллисекундах
  }

  function handleSubmit(event) {
    event.preventDefault();
    vandalAuth.authorize(formValues.PasswordInput, formValues.LoginInput).then((data) => {
      if(data.token){
        setIsFirstForm(true);
        setIsClosingStart(true);
        setIsFormStart(true);
        setTimeout(() => {
          navigate("/admin");
        }, 2000);
      }
    });
  }

  return (
    <div className="signin">
      <div
        className={`signin__popup ${
          isFormStart ? "fade-in" : isFirstForm ? "fade-out" : null
        }`}
      >
        <div
          className={`signin__start ${isClosingStart ? "fade-out" : "fade-in"}`}
        >
          <div className="signin__popup__containerTitle">
            <div className="signin__popup__containerTitle__con">
              <p className="signin__popup__containerTitle__con__title">
                Войдите как администратор и модерируйте
              </p>
              <p className="signin__popup__containerTitle__con__subtitle">
                и снова без лишних деталей
              </p>
            </div>
            <button
              onClick={handleNavLinkClick}
              className="signin__popup__containerTitle__navlink for1024"
            >
              <img
                src={BtnBack}
                className="signin__popup__containerTitle__navlink__img"
                alt="icon"
              />
              Вернуться назад
            </button>
          </div>

          {/* Форма поиска артикула */}
          <form
            onSubmit={handleSubmit}
            className="signin__popup__containerInput"
          >
            <label className="signin__popup__containerInput__label">
              <img
                alt="icon"
                src={LoginInput}
                className="signin__popup__containerInput__label__img"
              />
              <input
                placeholder="Логин"
                className="signin__popup__containerInput__label__input"
                type="login"
                value={formValues.LoginInput}
                onChange={handleChange}
                name="LoginInput"
              />
            </label>

            <label className="signin__popup__containerInput__label">
              <img
                alt="icon"
                src={PassInput}
                className="signin__popup__containerInput__label__img"
              />
              <input
                placeholder="Пароль"
                className="signin__popup__containerInput__label__input"
                type="password"
                value={formValues.PasswordInput}
                onChange={handleChange}
                name="PasswordInput"
              />
            </label>

            {/* Дополнительные кнопки */}
            <div className="signin__popup__containerBtns">
              <button
                type="button"
                className="signin__popup__containerBtns__btn"
                onClick={handleOpenQuest}
              >
                <img
                  alt="icon"
                  className="signin__popup__containerBtns__btn__img"
                  src={Err}
                />
                Не помню пароль
              </button>

              <button
                type="submit"
                className="signin__popup__containerBtns__btnsub"
              >
                <img
                  alt="icon"
                  className="signin__popup__containerBtns__btnsub__img"
                  src={SignInIcon}
                />
                Войти как администратор
              </button>
              <button
                type="button"
                onClick={handleNavLinkClick}
                className="signin__popup__containerTitle__navlink for768"
              >
                <img
                  src={BtnBack}
                  className="signin__popup__containerTitle__navlink__img"
                  alt="icon"
                />
                Вернуться назад
              </button>
            </div>
          </form>
        </div>

        {/* Всплывающее окно с подсказкой */}
        {isQuestOpen && (
          <SignInPopup
            setIsClosing={setIsClosing}
            setIsQuestOpen={setIsQuestOpen}
            isClosing={isClosing}
          />
        )}
      </div>

      <div className="signin__copyrite">
        <img src={Logo} alt="logo" className="signin__copyrite__img" />
        <p className="signin__copyrite__text">
          2024 © Copyright. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default SignIn;
