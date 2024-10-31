import React, { useState, useEffect } from "react";
import "./AdminNewPersonMobile.css";
import AddPerson from "../../images/AdminNewPerson/addperson.svg";
import Close from "../../images/AdminNewPerson/close.svg";
import { vandalAuth } from "../../utils/Auth";

function AdminNewPersonMobile(props) {
  const [close, setClose] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const [formValues, setFormValues] = useState({
    LoginInput: "",
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
      .register(formValues.PassInput, formValues.LoginInput)
      .then((data) => {
        if(data._id){
          console.log(data);
          props.setPersonNew()
          setClose(true);
          setIsMounted(true);
          setTimeout(() => {
            props.setOpenPerson(false);
          }, 500);
          
        }
      })
      .catch((error) => {
        console.error(error);
      });

  }

  return (
    <div className={`adminnewpersonmobile ${isMounted && !close ? "in" : "out"} `}>
      <div className="adminnewpersonmobile__popup">
        <p className="adminnewpersonmobile__popup__title">
          Добавим нового сотрудника
        </p>
        <p className="adminnewpersonmobile__popup__subtitle">
          Что бы он тоже страдал на этом сайте, за то с удовольствием
        </p>
        <form onSubmit={handleSubmit} className="adminnewpersonmobile__popup__form">
          <input
            className="adminnewpersonmobile__popup__form__input"
            value={formValues.LoginInput}
            onChange={handleChange}
            name="LoginInput"
            placeholder="Придумайте пароль для сотрудника"
          />
          <input
            className="adminnewpersonmobile__popup__form__input"
            value={formValues.PassInput}
            onChange={handleChange}
            name="PassInput"
            placeholder="Придумайте пароль для сотрудника"
          />
          <div className="adminnewpersonmobile__popup__form__container">
            <button
            onClick={() =>{
                setClose(true);
                setIsMounted(true);
                setTimeout(() => {
                  props.setOpenPerson(false);
                }, 500);
            }}
              type="button"
              className="adminnewpersonmobile__popup__form__container__btn"
            >
              <img
                alt="icon"
                src={Close}
                className="adminnewpersonmobile__popup__form__container__btn__img"
              />
              <span className="adminnewpersonmobile__popup__form__container__btn__span">
                Отменить создание
              </span>
            </button>
            <button
              type="submit"
              className="adminnewpersonmobile__popup__form__container__btn"
            >
              <img
                alt="icon"
                src={AddPerson}
                className="adminnewpersonmobile__popup__form__container__btn__img"
              />
              <span className="adminnewpersonmobile__popup__form__container__btn__span">
                Создать новый аккаунт сотрудника
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AdminNewPersonMobile;
