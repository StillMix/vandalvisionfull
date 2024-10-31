import React, { useState, useEffect } from "react";
import "./AdminMobilePopupCardImg.css";
import Cancel from "../../images/Admin/cancel.svg";
import Load from "../../images/Admin/load.svg";

function AdminMobilePopupCardImg(props) {
  const op = props.op || "";

  const [formValues, setFormValues] = useState({
    NewImgInput: op ? op : "",
  });
  const [close, setClose] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

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

  return (
    <div
      className={`adminpopupcardmobile__popup__imgSrc ${
        isMounted && !close ? "in" : "out"
      }`}
    >
      <div className="adminpopupcardmobile__popup__imgSrc__popup">
        <p className="adminpopupcardmobile__popup__imgSrc__popup__title">
          Добавим изображение
        </p>
        <p className="adminpopupcardmobile__popup__imgSrc__popup__subtitle">
          Используйте imgur для загрузки изображения
        </p>
        <input
          className="adminpopupcardmobile__popup__imgSrc__popup__input"
          type="text"
          value={formValues.NewImgInput}
          onChange={handleChange}
          name="NewImgInput"
          placeholder="Вставьте ссылку "
        />
        <div className="adminpopupcardmobile__popup__imgSrc__popup__btns">
        <button
            onClick={() => {
              props.setForm({
                ...formValues,
                ImgInput: formValues.NewImgInput,
              });
              setClose(true);
              setTimeout(() => {
                props.setCloseImg(false);
                setFormValues("");
              }, 500);
            }}
            className="adminpopupcardmobile__popup__imgSrc__popup__btns__btn"
          >
            <img
              alt="icon"
              src={Load}
              className="adminpopupcardmobile__popup__imgSrc__popup__btns__btn__img"
            />
            <span className="adminpopupcardmobile__popup__imgSrc__popup__btns__btn__span">
              Загрузить изображение
            </span>
          </button>
          <button
            onClick={() => {
              setClose(true);
              setTimeout(() => {
                props.setCloseImg(false);
                setFormValues("");
              }, 500);
            }}
            className="adminpopupcardmobile__popup__imgSrc__popup__btns__btn"
          >
            <img
              alt="icon"
              src={Cancel}
              className="adminpopupcardmobile__popup__imgSrc__popup__btns__btn__img"
            />
            <span className="adminpopupcardmobile__popup__imgSrc__popup__btns__btn__span">
              Отменить загрузку
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminMobilePopupCardImg;
