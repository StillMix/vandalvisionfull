import React, { useState } from "react";
import "./SignInMobile.css";
import Logo from "../../images/SignIn/logo.svg";
import { useNavigate } from "react-router-dom";
import Err from "../../images/SignIn/err.svg";
import BtnBack from "../../images/SignIn/btnBack.svg";
import SignInMobilePopup from "../SignInMobilePopup/SignInMobilePopup";
import SignInMobileIcon from "../../images/SignIn/signin.svg";
import PassInput from "../../images/SignIn/passwordInput.svg";
import LoginInput from "../../images/SignIn/loginInput.svg";
import { vandalAuth } from "../../utils/Auth";

function SignInMobile() {
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
    <div className="signinmobile">
      <div
        className={`signinmobile__popup ${
          isFormStart ? "fade-in" : isFirstForm ? "fade-out" : null
        }`}
      >
        <div
          className={`signinmobile__start ${
            isClosingStart ? "fade-out" : "fade-in"
          }`}
        >
          <div className="signinmobile__popup__containerTitle">
            <p className="signinmobile__popup__containerTitle__con__title">
              Войдите как администратор и модерируйте
            </p>
            <p className="signinmobile__popup__containerTitle__con__subtitle">
              и снова без лишних деталей
            </p>
          </div>

          {/* Форма поиска артикула */}
          <form
            onSubmit={handleSubmit}
            className="signinmobile__popup__containerInput"
          >
            <label className="signinmobile__popup__containerInput__label">
              <img
                alt="icon"
                src={LoginInput}
                className="signinmobile__popup__containerInput__label__img"
              />
              <input
                placeholder="Логин"
                className="signinmobile__popup__containerInput__label__input"
                type="login"
                value={formValues.LoginInput}
                onChange={handleChange}
                name="LoginInput"
              />
            </label>

            <label className="signinmobile__popup__containerInput__label">
              <img
                alt="icon"
                src={PassInput}
                className="signinmobile__popup__containerInput__label__img"
              />
              <input
                placeholder="Пароль"
                className="signinmobile__popup__containerInput__label__input"
                type="password"
                value={formValues.PasswordInput}
                onChange={handleChange}
                name="PasswordInput"
              />
            </label>

            {/* Дополнительные кнопки */}
            <div className="signinmobile__popup__containerBtns">
              <button
                type="button"
                className="signinmobile__popup__containerBtns__btn"
                onClick={handleOpenQuest}
              >
                <img
                  alt="icon"
                  className="signinmobile__popup__containerBtns__btn__img"
                  src={Err}
                />
                Не помню пароль
              </button>

              <button
                type="submit"
                className="signinmobile__popup__containerBtns__btnsub"
              >
                <img
                  alt="icon"
                  className="signinmobile__popup__containerBtns__btnsub__img"
                  src={SignInMobileIcon}
                />
                Войти как администратор
              </button>
              <button
                type="button"
                onClick={handleNavLinkClick}
                className="signinmobile__popup__containerTitle__navlink "
              >
                <img
                  src={BtnBack}
                  className="signinmobile__popup__containerTitle__navlink__img"
                  alt="icon"
                />
                Вернуться назад
              </button>
            </div>
          </form>
        </div>
      </div>
      {/* Всплывающее окно с подсказкой */}
      {isQuestOpen && (
        <SignInMobilePopup
          setIsClosing={setIsClosing}
          setIsQuestOpen={setIsQuestOpen}
          isClosing={isClosing}
        />
      )}
      <div className="signinmobile__copyrite">
        <img src={Logo} alt="logo" className="signinmobile__copyrite__img" />
        <p className="signinmobile__copyrite__text">
          2024 © Copyright. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default SignInMobile;
