import React, { useState, useEffect } from "react";
import "./MainMobile.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Main/logo.svg";
import SingIn from "../../images/Main/signin.svg";
import Img from "../../images/Main/img.svg";
import Err from "../../images/Main/err.svg";
import MainMobilePopup from "../MainMobilePopup/MainMobilePopup";
import MainMobileLoading from "../MainMobileLoading/MainMobileLoading";
import MainMobilePopupImg from "../MainMobilePopupImg/MainMobilePopupImg";
import MainMobileImg from "../MainMobileImg/MainMobileImg";
import MainMobileErr from "../MainMobileErr/MainMobileErr";

function MainMobile(props) {
  const navigate = useNavigate();
  const [formValues, setFormValues] = useState({
    ArticulInput: "",
  });
  const [isCloasingAnimImage, setIsClosingAnimImage] = useState(false);
  const [isPopup, setIsPopup] = useState(false);
  const [isQuestOpen, setIsQuestOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [isClosingStart, setIsClosingStart] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingDolg, setIsLoadingDolg] = useState(false);
  const [isFound, setIsFound] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isClosingLoading, setIsClosingLoading] = useState(false);
  const [isClosingErr, setIsClosingErr] = useState(false);
  const [isFirst, setIsFirst] = useState(true);
  const [isClosingFound, setIsClosingFound] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [isFullScreenAnim, setIsFullScreenAnim] = useState(false);
  const [goodCard, setGoodCard] = useState([]);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function handleSubmit(event) {
    event.preventDefault();
    setIsClosingStart(true);
    setIsError(false);

    const inputArticul = formValues.ArticulInput.trim().toLowerCase();
    let cardGood = null; // Переменная для хранения найденной карточки
    if (props.cardsSearch) {
      cardGood = props.cardsSearch.find(
        (card) => card.arc.toLowerCase() === inputArticul
      );
      if (cardGood) {
        setGoodCard(cardGood);
      }
    }

    setTimeout(() => {
      setIsClosingLoading(false);
      setIsLoading(true);

      setTimeout(() => {
        if (cardGood) {
          setIsLoadingDolg(false);
        } else {
          setIsLoadingDolg(true);
        }

        setTimeout(() => {
          if (cardGood) {
            setIsLoadingDolg(false);
            setIsFound(false);
            setIsClosingLoading(true);
            setIsClosingFound(false);
            setIsFound(true); // Здесь можно также передать cardGood, если нужно
          } else {
            setIsFound(false);
            setIsClosingLoading(true);
            setTimeout(() => {
              setIsClosingErr(false);
              setIsLoading(false);
              setIsError(true);
              setIsLoadingDolg(false);
            }, 500);
          }
        }, 2000);
      }, 3000);
    }, 2000);
  }

  function handleOpenQuest() {
    setIsQuestOpen(true);
  }


  const [showBck, setShowBck] = useState(false);

  useEffect(() => {
    if (!isFullScreenAnim) {
      const timer = setTimeout(() => {
        setShowBck(true);
      }, 2000);
      
      // Очистка таймера при размонтировании компонента или изменении состояния
      return () => clearTimeout(timer);
    } else {
      // Сброс состояния, если анимация полных экранов активна
      setShowBck(false);
    }
  }, [isFullScreenAnim]);

  return (
    <div className="mainmobile">
      <div
        className={`${"mainmobile__popup"} ${
          isFullScreenAnim ? "openImg" : isFirst ? null : "closeImg"
        }  ${showBck ? "bck" : ""}`}
      >
        {/* Блок начального экрана */}
        {!isLoading && !isFound && !isError && (
          <>
            <div
              className={`mainmobile__start ${
                isClosingStart ? "fade-out" : "fade-in"
              }`}
            >
              <div className="mainmobile__popup__containerTitle">
                <div className="mainmobile__popup__containerTitle__con">
                  <p className="mainmobile__popup__containerTitle__con__title">
                  Найди инструкцию здесь
                  </p>
                  <p className="mainmobile__popup__containerTitle__con__subtitle">
                  без лишних проблем
                  </p>
                </div>
              </div>

              {/* Форма поиска артикула */}
              <form
                onSubmit={handleSubmit}
                className="mainmobile__popup__containerInput"
              >
                <input
                  placeholder="Введите артикул"
                  className="mainmobile__popup__containerInput__input"
                  type="text"
                  value={formValues.ArticulInput}
                  onChange={handleChange}
                  name="ArticulInput"
                />
                <button
                  type="submit"
                  className="mainmobile__popup__containerInput__btn"
                >
                  <p className="mainmobile__popup__containerInput__btn__text">
                    Поиск
                  </p>
                </button>
              </form>
              {/* Дополнительные кнопки */}
              <div className="mainmobile__popup__containerBtns">
                <button
                  className="mainmobile__popup__containerBtns__btn"
                  onClick={handleOpenQuest}
                >
                  <img
                    alt="icon"
                    className="mainmobile__popup__containerBtns__btn__img"
                    src={Err}
                  />
                  Не могу найти
                </button>
                <div className="mainmobile__popup__containerTitle__navlink "></div>
                <p className="mainmobile__popup__containerBtns__title ">
                  <img
                    alt="icon"
                    className="mainmobile__popup__containerBtns__title__img"
                    src={Img}
                  />
                  Ищите артикул на обратной или лицевой стороне
                </p>
              </div>
            </div>
          </>
        )}

        {/* Всплывающее окно с подсказкой */}

        {/* Блок загрузки */}
        {isLoading && (
          <MainMobileLoading
            isClosingLoading={isClosingLoading}
            isLoadingDolg={isLoadingDolg}
          />
        )}

        {/* Блок результата поиска */}
        {isFound && (
          <MainMobileImg
          goodCard={goodCard}
            setIsPopup={setIsPopup}
            isCloasingAnimImage={isCloasingAnimImage}
            setIsClosingAnimImage={setIsClosingAnimImage}
            isFirst={isFirst}
            setIsFirst={setIsFirst}
            setIsFullScreenAnim={setIsFullScreenAnim}
            setIsFullScreen={setIsFullScreen}
            isFullScreenAnim={isFullScreenAnim}
            isFullScreen={isFullScreen}
            setIsError={setIsError}
            setIsClosingFound={setIsClosingFound}
            setIsClosingStart={setIsClosingStart}
            setIsLoading={setIsLoading}
            setFormValues={setFormValues}
            setIsFound={setIsFound}
          />
        )}

        {/* Блок ошибки */}
        {isError && (
          <MainMobileErr
            setIsError={setIsError}
            setIsFound={setIsFound}
            setIsClosingStart={setIsClosingStart}
            setIsLoading={setIsLoading}
            setFormValues={setFormValues}
            isClosingErr={isClosingErr}
          />
        )}
      </div>
      {isFullScreen && (
        <MainMobilePopupImg
        goodCard={goodCard}
          setIsPopup={setIsPopup}
          isFirst={isFirst}
          setIsFirst={setIsFirst}
          setIsFullScreenAnim={setIsFullScreenAnim}
          setIsFullScreen={setIsFullScreen}
          isFullScreenAnim={isFullScreenAnim}
          isFullScreen={isFullScreen}
          isClosingFound={isClosingFound}
        />
      )}
      {isQuestOpen && (
        <MainMobilePopup
          setIsClosing={setIsClosing}
          setIsQuestOpen={setIsQuestOpen}
          isClosing={isClosing}
        />
      )}
      {/* Нижний блок с копирайтом */}
      <div className="mainmobile__copyrite">
        <img src={Logo} alt="logo" className="mainmobile__copyrite__img" />
        <p className="mainmobile__copyrite__text">
          2024 © Copyright. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default MainMobile;
