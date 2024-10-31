import React, { useState , useEffect} from "react";
import "./Main.css";
import Logo from "../../images/Main/logo.svg";
import Search from "../../images/Main/search.svg";
import Img from "../../images/Main/img.svg";
import Err from "../../images/Main/err.svg";
import MainPopup from "../MainPopup/MainPopup";
import MainLoading from "../MainLoading/MainLoading";
import MainPopupImg from "../MainPopupImg/MainPopupImg";
import MainImg from "../MainImg/MainImg";
import MainErr from "../MainErr/MainErr";
import vk from "../../images/Main/vk.svg";
import ozon from "../../images/Main/ozon.svg";
import wb from "../../images/Main/wb.svg";

function Main(props) {
  const [hovered, setHovered] = useState(false);
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
    <div className="main">
      <div
        className="social-icons"
        style={{ overflow: hovered ? "visible" : "hidden" }}
      >
        <a
          href="https://vk.com/vandalvision"
          target="_blank"
          rel="noopener noreferrer" // Исправлено
          className="icon"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={vk} alt="VK" />
          <span className="tooltip">vandalvision</span>
        </a>
        <a
          href="https://www.wildberries.ru/seller/1282869"
          target="_blank"
          rel="noopener noreferrer" // Исправлено
          className="icon"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={wb} alt="WB" />
          <span className="tooltip">YOUN</span>
        </a>
        <a
          href="https://www.wildberries.ru/seller/271668"
          target="_blank"
          rel="noopener noreferrer" // Исправлено
          className="icon"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={wb} alt="WB" />
          <span className="tooltip">yakuza</span>
        </a>
        <a
          href="https://www.wildberries.ru/seller/4152718"
          target="_blank"
          rel="noopener noreferrer" // Исправлено
          className="icon"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={wb} alt="WB" />
          <span className="tooltip">Tatar</span>
        </a>
        <a
          href="https://www.ozon.ru/seller/tatar-2131904/products/?miniapp=seller_2131904"
          target="_blank"
          rel="noopener noreferrer" // Исправлено
          className="icon"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={ozon} alt="Ozon" />
          <span className="tooltip">Tatar</span>
        </a>
        <a
          href="https://www.ozon.ru/seller/kartiny-na-stenu-1532754/products/?miniapp=seller_1532754"
          target="_blank"
          rel="noopener noreferrer" // Исправлено
          className="icon"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <img src={ozon} alt="Ozon" />
          <span className="tooltip">картины на стену</span>
        </a>
      </div>
      <div className={`${"main__popup"}  ${
        isFullScreenAnim ? "openImg" : isFirst ? null : "closeImg"
      }  ${"main__popup"}  ${showBck ? "bck" : ""}`}>
        {/* Блок начального экрана */}
        {!isLoading && !isFound && !isError && (
          <>
            <div
              className={`main__start ${
                isClosingStart ? "fade-out" : "fade-in"
              }`}
            >
              <div className="main__popup__containerTitle">
                <div className="main__popup__containerTitle__con">
                  <p className="main__popup__containerTitle__con__title">
                    Найди инструкцию здесь
                  </p>
                  <p className="main__popup__containerTitle__con__subtitle">
                    без лишних проблем
                  </p>
                </div>
                <div className="main__popup__containerTitle__navlink for1024"></div>
              </div>

              {/* Форма поиска артикула */}
              <form
                onSubmit={handleSubmit}
                className="main__popup__containerInput"
              >
                <input
                  placeholder="Введите артикул"
                  className="main__popup__containerInput__input"
                  type="text"
                  value={formValues.ArticulInput}
                  onChange={handleChange}
                  name="ArticulInput"
                />
                <button
                  type="submit"
                  className="main__popup__containerInput__btn"
                >
                  <p className="main__popup__containerInput__btn__text">
                    Поиск
                  </p>
                  <img
                    src={Search}
                    className="main__popup__containerInput__btn__img"
                    alt="search"
                  />
                </button>
              </form>

              {/* Дополнительные кнопки */}
              <div className="main__popup__containerBtns">
                <p className="main__popup__containerBtns__title for1024">
                  <img
                    alt="icon"
                    className="main__popup__containerBtns__title__img"
                    src={Img}
                  />
                  Ищите артикул на обратной или лицевой стороне
                </p>
                <button
                  className="main__popup__containerBtns__btn"
                  onClick={handleOpenQuest}
                >
                  <img
                    alt="icon"
                    className="main__popup__containerBtns__btn__img"
                    src={Err}
                  />
                  Не могу найти
                </button>
                <div className="main__popup__containerTitle__navlink for768"></div>

                <p className="main__popup__containerBtns__title for768">
                  <img
                    alt="icon"
                    className="main__popup__containerBtns__title__img"
                    src={Img}
                  />
                  Ищите артикул на обратной или лицевой стороне
                </p>
              </div>
            </div>
          </>
        )}

        {/* Всплывающее окно с подсказкой */}
        {isQuestOpen && (
          <MainPopup
            setIsClosing={setIsClosing}
            setIsQuestOpen={setIsQuestOpen}
            isClosing={isClosing}
          />
        )}

        {/* Блок загрузки */}
        {isLoading && (
          <MainLoading
            isClosingLoading={isClosingLoading}
            isLoadingDolg={isLoadingDolg}
          />
        )}

        {/* Блок результата поиска */}
        {isFound && (
          <MainImg
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
          <MainErr
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
        <MainPopupImg
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
      {/* Нижний блок с копирайтом */}
      <div className="main__copyrite">
        <img src={Logo} alt="logo" className="main__copyrite__img" />
        <p className="main__copyrite__text">
          2024 © Copyright. All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Main;
