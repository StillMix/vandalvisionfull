import React, { useState } from "react";
import "./MainMobileImg.css";
import SearchW from "../../images/Main/searchW.svg";
import FullScreen from "../../images/Main/fullScreen.svg";
import Arc from "../../images/Main/arc.svg";
import Razmer from "../../images/Main/razmer.svg";
import Capel from "../../images/Main/capel.svg";
import Star from "../../images/Main/star.svg";

function MainMobileImg(props) {
  const [onloadImgSlide, setOnloadImgSlide] = useState(true);
  const card = props.goodCard ? props.goodCard : "";
  console.log(card);
  function toggleFullScreen() {
    props.setIsPopup(true);
    props.setIsFullScreenAnim(!props.isFullScreenAnim);
    setOnloadImgSlide(false);
    setTimeout(() => {
      props.setIsFullScreen(!props.isFullScreen);
    }, 2000);
  }

  function handleBackToStartFromFound() {
    setOnloadImgSlide(true);
    props.setIsError(false);
    props.setIsFirst(true);
    props.setIsClosingAnimImage(true); // Начинаем анимацию закрытия

    setTimeout(() => {
      setTimeout(() => {
        props.setIsFound(false);
        props.setIsClosingAnimImage(false); // Сбрасываем анимацию
        props.setIsClosingFound(true);
        props.setIsClosingStart(false);
        props.setIsClosingFound(false);
      }, 500); // Даем время для проигрывания анимации
    }, 500);

    props.setIsLoading(false);
    props.setFormValues({ ArticulInput: "" });
  }

  return (
    <div
      className={`mainmobile__imgs ${
        props.isFullScreenAnim
          ? "openImgMobile"
          : props.isFirst
          ? null
          : "closeImgMobile"
      }`}
    >
      <img
        src={`https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${card.img}`}
        alt="result"
        className={`mainmobile__imgs__img ${
          props.isCloasingAnimImage
            ? "slideUpImg"
            : onloadImgSlide
            ? "slideDownImg"
            : ""
        } ${
          props.isFullScreenAnim
            ? "openImgMobile"
            : props.isFirst
            ? null
            : "closeImgMobile"
        }`}
      />

      <div
        className={`mainmobile__imgs__op ${
          props.isCloasingAnimImage ? "slideUpImg" : "slideDownImg"
        } ${
          props.isFullScreenAnim
            ? "openImgMobile"
            : props.isFirst
            ? ""
            : "closeImgMobile"
        }`}
      >
        <div className="mainmobile__imgs__op__container">
          <p className="mainmobile__imgs__op__container__title">{card.name}</p>
          <p className="mainmobile__imgs__op__container__opcon__card">
            <img
              src={Arc}
              className="mainmobile__imgs__op__container__opcon__card__img"
              alt="icon"
            />
            <span>Артикул: {card.arc}</span>
          </p>
          <p className="mainmobile__imgs__op__container__opcon__card">
            <img
              src={Capel}
              className="mainmobile__imgs__op__container__opcon__card__img"
              alt="icon"
            />
            <span>Цветов: {card.colors}</span>
          </p>
          <p className="mainmobile__imgs__op__container__opcon__card">
            <img
              src={Razmer}
              className="mainmobile__imgs__op__container__opcon__card__img"
              alt="icon"
            />
            <span>Размер: {card.razm}</span>
          </p>

          <p className="mainmobile__imgs__op__container__opcon__card">
            <img
              src={Star}
              className="mainmobile__imgs__op__container__opcon__card__img"
              alt="icon"
            />
            <span>
              Сложность:
              <span
                className={`${card.difficulty === "hard" ? "red" : ""} ${
                  card.difficulty === "normal" ? "yellow" : ""
                } ${card.difficulty === "eazy" ? "green" : ""}`}
              >
                {card.difficulty === "hard" && "Высокая"}{" "}
                {card.difficulty === "normal" && "Средняя"}{" "}
                {card.difficulty === "eazy" && "Низкая"}
              </span>
            </span>
          </p>
          <div className="mainmobile__imgs__op__container__btns">
            <button
              onClick={handleBackToStartFromFound}
              className="mainmobile__imgs__op__container__btns__back"
            >
              <img
                alt="icon"
                className="mainmobile__imgs__op__container__btns__back__img"
                src={SearchW}
              />
              <span>Вернуться к поиску</span>
            </button>
            <button
              onClick={toggleFullScreen}
              className="mainmobile__imgs__op__container__btns__fullscreen"
            >
              <img
                alt="icon"
                src={FullScreen}
                className="mainmobile__imgs__op__container__btns__fullscreen__img"
              />
              <span>Развернуть</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainMobileImg;
