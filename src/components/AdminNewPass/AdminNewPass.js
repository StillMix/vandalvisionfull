import React, { useState, useEffect } from "react";
import "./AdminNewPass.css";
import Reset from "../../images/AdminNewPass/reset.svg";
import Close from "../../images/AdminNewPass/close.svg";
import { vandalAuth } from "../../utils/Auth";

function AdminNewPass(props) {
  let person = props.openCard ? props.openCard : "";
  const [close, setClose] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [formValues, setFormValues] = useState({
    PassInput: "",
  });

  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 10); // Задержка для плавного появления
  }, []);
  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    vandalAuth
      .patchUserPass(formValues.PassInput, person)
      .then((data) => {
        console.log(data.data);
        if(data.data._id) {
          setClose(true);
          setIsMounted(true);
          setTimeout(() => {
            props.setOpenPass(false);
          }, 500);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }

  return (
    <div className={`adminnewpass ${isMounted && !close ? "in" : "out"} `}>
      <div className="adminnewpass__popup">
        <p className="adminnewpass__popup__title">
          Конечно, давайте сбросим пароль сотрудника, что забыл пароль
        </p>
        <p className="adminnewpass__popup__subtitle">
          Или не забыл, в любом случае, без лишних вопросов
        </p>
        <form onSubmit={handleSubmit} className="adminnewpass__popup__form">
          <input
            className="adminnewpass__popup__form__input"
            value={formValues.PassInput}
            onChange={handleChange}
            name="PassInput"
            placeholder="Введите новый пароль для сотрудника"
          />
          <div className="adminnewpass__popup__form__container">
            <button
              onClick={() => {
                setClose(true);
                setIsMounted(true);
                setTimeout(() => {
                  props.setOpenPass(false);
                }, 500);
              }}
              type="button"
              className="adminnewpass__popup__form__container__btn"
            >
              <img
                alt="icon"
                src={Close}
                className="adminnewpass__popup__form__container__btn__img"
              />
              <span className="adminnewpass__popup__form__container__btn__span">
                Отменить создание
              </span>
            </button>
            <button
              type="submit"
              className="adminnewpass__popup__form__container__btn"
            >
              <img
                alt="icon"
                src={Reset}
                className="adminnewpass__popup__form__container__btn__img"
              />
              <span className="adminnewpass__popup__form__container__btn__span">
                Сбросить пароль
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminNewPass;
