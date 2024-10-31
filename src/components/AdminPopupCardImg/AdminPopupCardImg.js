import React, { useState, useEffect } from "react";
import "./AdminPopupCardImg.css";
import Cancel from "../../images/Admin/cancel.svg";
import Load from "../../images/Admin/load.svg";

function AdminPopupCardImg(props) {
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
      className={`adminpopupcard__popup__imgSrc ${
        isMounted && !close ? "in" : "out"
      }`}
    >
      <div className="adminpopupcard__popup__imgSrc__popup">
        <p className="adminpopupcard__popup__imgSrc__popup__title">
          Добавим изображение
        </p>
        <p className="adminpopupcard__popup__imgSrc__popup__subtitle">
          Используйте imgur для загрузки изображения
        </p>
        <input
          className="adminpopupcard__popup__imgSrc__popup__input"
          type="text"
          value={formValues.NewImgInput}
          onChange={handleChange}
          name="NewImgInput"
          placeholder="Вставьте ссылку "
        />
        <div className="adminpopupcard__popup__imgSrc__popup__btns">
          <button
            onClick={() => {
              setClose(true);
              setTimeout(() => {
                props.setCloseImg(false);
                setFormValues("");
              }, 500);
            }}
            className="adminpopupcard__popup__imgSrc__popup__btns__btn"
          >
            <img
              alt="icon"
              src={Cancel}
              className="adminpopupcard__popup__imgSrc__popup__btns__btn__img"
            />
            <span className="adminpopupcard__popup__imgSrc__popup__btns__btn__span">
              Отменить загрузку
            </span>
          </button>
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
            className="adminpopupcard__popup__imgSrc__popup__btns__btn"
          >
            <img
              alt="icon"
              src={Load}
              className="adminpopupcard__popup__imgSrc__popup__btns__btn__img"
            />
            <span className="adminpopupcard__popup__imgSrc__popup__btns__btn__span">
              Загрузить изображение
            </span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default AdminPopupCardImg;
