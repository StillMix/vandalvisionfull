import React, { useState, useEffect } from "react";
import "./AdminMobile.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Admin/logo.svg";
import SignInIcon from "../../images/Admin/signin.svg";
import NewFile from "../../images/Admin/newfile.svg";
import Person from "../../images/Admin/person.svg";
import Lilo from "../../images/Admin/lilo2.png";
import Arc from "../../images/Admin/arc.svg";
import Colorses from "../../images/Admin/capel.svg";
import Razmer from "../../images/Admin/razmer.svg";
import Star from "../../images/Admin/star.svg";
import Menu from "../../images/Admin/menu.svg";
import Arrow from "../../images/Admin/arrow.svg";
import AdminMobilePopupCard from "../AdminMobilePopupCard/AdminMobilePopupCard";
import AdminMobilePopupPersons from "../AdminMobilePopupPersons/AdminMobilePopupPersons";
import api from "../../utils/Api";

function AdminMobile(props) {
  let card = props.cardsSearch ? props.cardsSearch : [];
  const navigate = useNavigate();
  const [admins, setAdmins] = useState(false);
  useEffect(() => {
    props.me.data
      ? props.me.data.admins === "ok"
        ? setAdmins(true)
        : setAdmins(false)
      : console.log("ждём");
  }, [props.me]);

  function setCards() {
    api
      .getCardsUser()
      .then((data) => {
        props.setCardsSearch(data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  const [isClosingStart, setIsClosingStart] = useState(false);
  const [isFormStart, setIsFormStart] = useState(false);
  const [isFirstForm, setIsFirstForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const [isOpenPopupCard, setIsopenPopupCard] = useState(false);
  const [PopupCardOp, setPopupCardOp] = useState(null);
  const [isPersonOpen, setIsPersonOpen] = useState(false);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuOpenPopup, setIsMenuOpenPopup] = useState(false);
  const [isMenuOpenOne, setIsMenuOpenOne] = useState(false);

  function handleSubmit() {
    if (isMenuOpen) {
      setIsMenuOpenOne(true);
      setIsMenuOpenPopup(false);
      setTimeout(() => {
        setTimeout(() => {
          setIsFirstForm(true);
          setIsClosingStart(true);
          setIsFormStart(true);
          setTimeout(() => {
            localStorage.removeItem("jwt");
            console.log("не удаляем на мал пк");
            setTimeout(() => {
              navigate("/signin");
            }, 20);
          }, 2000);
        }, 800);
        setIsMenuOpen(false);
      }, 800);
    } else {
      setIsFirstForm(true);
      setIsClosingStart(true);
      setIsFormStart(true);
      setTimeout(() => {
        localStorage.removeItem("jwt");
        console.log("не удаляем на пк");
        setTimeout(() => {
          navigate("/signin");
        }, 20);
      }, 2000);
    }
  }

  function deleteCard(id) {
    api
      .deleteCard(id)
      .then((data) => {
        console.log(data);
        setCards();
      })
      .catch((error) => {
        console.error("Ошибка при удалении карточки:", error);
      });
  }

  const filteredCards = Array.isArray(card)
    ? card.filter((i) => i.arc.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <div className="adminmobile ">
      <div
        className={`adminmobile__popup ${
          isFormStart ? "fade-out" : isFirstForm ? "fade-in" : null
        }`}
      >
        <div
          className={`adminmobile__start ${
            isClosingStart ? "fade-out" : "fade-in"
          }`}
        >
          <div className="adminmobile__start__header">
            <p className="adminmobile__start__header__title">
              Панель администратора
              <span>{admins ? "SA" : "SE"}</span>
            </p>
            <button
              className="adminmobile__start__header__btn"
              onClick={() => {
                setIsMenuOpen(true);
                setTimeout(() => {
                  setIsMenuOpenPopup(true);
                }, 800);
              }}
            >
              <img
                src={Menu}
                className="adminmobile__start__header__btn__img"
                alt="icon"
              />
            </button>
          </div>
          <div className="adminmobile__start__btns">
            <input
              placeholder="Поиск артикуля"
              type="text"
              className="adminmobile__start__btns__input"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="adminmobile__start__cards">
            {filteredCards.map((i) => (
              <div
                key={i.id}
                style={{
                  backgroundImage: `url(${`https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${i.img}`})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                }}
                className="adminmobile__start__cards__card"
              >
                <div className="adminmobile__start__cards__card_backimg"> </div>
                <div className="adminmobile__start__cards__card__conimg"> </div>
                <div className="adminmobile__start__cards__card__opcon">
                  <p className="adminmobile__start__cards__card__opcon__title">
                    {i.arc}
                  </p>
                  <div className="adminmobile__start__cards__card__opcon_op">
                    <div className="adminmobile__start__cards__card__opcon_op__containerone">
                      <p className="adminmobile__start__cards__card__opcon_op__containerone__text">
                        <img
                          alt="icon"
                          src={Razmer}
                          className="adminmobile__start__cards__card__opcon_op__containerone__text__img"
                        />
                        <span className="adminmobile__start__cards__card__opcon_op__containerone__text__span">
                        Название: {i.name}
                        </span>
                      </p>
                      <p className="adminmobile__start__cards__card__opcon_op__containerone__text">
                        <img
                          alt="icon"
                          src={Colorses}
                          className="adminmobile__start__cards__card__opcon_op__containerone__text__img"
                        />
                        <span className="adminmobile__start__cards__card__opcon_op__containerone__text__span">
                          Цветов: {i.colors}
                        </span>
                      </p>
                    </div>
                    <div className="adminmobile__start__cards__card__opcon_op__containertwo">
                      <p className="adminmobile__start__cards__card__opcon_op__containertwo__text">
                        <img
                          alt="icon"
                          src={Arc}
                          className="adminmobile__start__cards__card__opcon_op__containertwo__text__img"
                        />
                        <span className="adminmobile__start__cards__card__opcon_op__containertwo__text__span">
                          Размер: {i.razm}
                        </span>
                      </p>
                      <p className="adminmobile__start__cards__card__opcon_op__containertwo__text">
                        <img
                          alt="icon"
                          src={Star}
                          className="adminmobile__start__cards__card__opcon_op__containertwo__text__img"
                        />
                        <span className="adminmobile__start__cards__card__opcon_op__containertwo__text__span">
                          Сложность:
                          <span
                            className={`adminmobile__start__cards__card__opcon_op__containertwo__text__span__diff ${
                              i.difficulty === "hard" && "red"
                            } ${i.difficulty === "normal" && "yellow"} ${
                              i.difficulty === "eazy" && "green"
                            }`}
                          >
                            {i.difficulty === "hard" && "Высокая"}{" "}
                            {i.difficulty === "normal" && "Средняя"}{" "}
                            {i.difficulty === "eazy" && "Низкая"}
                          </span>
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="adminmobile__start__cards__card__opcon__btns">
                    <button
                      className="adminmobile__start__cards__card__opcon__btns__btn"
                      onClick={() => {
                        setIsopenPopupCard(true);
                        setPopupCardOp(i);
                      }}
                    >
                      Редактировать
                    </button>
                    <button
                      onClick={() => {
                        deleteCard(i._id);
                      }}
                      className="adminmobile__start__cards__card__opcon__btns__btn"
                    >
                      Удалить
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        {isOpenPopupCard ? (
          <AdminMobilePopupCard
          card={card}
          setCards={setCards}
          setPopupCardOp={setPopupCardOp}
          setIsopenPopupCard={setIsopenPopupCard}
          op={PopupCardOp}
          />
        ) : null}
        {isPersonOpen ? (
          <AdminMobilePopupPersons setIsPersonOpen={setIsPersonOpen} />
        ) : null}
      </div>

      <div
        className={`adminmobile__popup__menu ${
          isMenuOpen ? "open" : isMenuOpenOne ? "close" : null
        }`}
      >
        <div
          className={`adminmobile__popup__menu__popup ${
            isMenuOpenPopup ? "open" : isMenuOpenOne ? "close" : null
          }`}
        >
          <button
            onClick={() => {
              setIsMenuOpenOne(true);
              setIsMenuOpenPopup(false);
              setTimeout(() => {
                setIsMenuOpen(false);
              }, 800);
            }}
            className="adminmobile__popup__menu__popup__btn"
          >
            <img
              alt="icon"
              src={Arrow}
              className="adminmobile__popup__menu__popup__btn__img"
            />
          </button>
          <div className="adminmobile__popup__menu__popup__con">
            <p className="adminmobile__popup__menu__popup__con__tip">
              {admins ? "Senior Administrator" : "Standard employee"}
            </p>
            {admins ? (
              <button
                onClick={() => {
                  setIsMenuOpenOne(true);
                  setIsMenuOpenPopup(false);
                  setTimeout(() => {
                    setTimeout(() => {
                      setIsPersonOpen(true);
                    }, 800);
                    setIsMenuOpen(false);
                  }, 800);
                }}
                className="adminmobile__popup__menu__popup__con__btn"
              >
                <img
                  alt="icon"
                  className="adminmobile__popup__menu__popup__con__btn__img"
                  src={Person}
                />
                <span className="adminmobile__popup__menu__popup__con__btn__span">
                  Сотрудники
                </span>
              </button>
            ) : null}
            <button
              onClick={() => {
                setIsMenuOpenOne(true);
                setIsMenuOpenPopup(false);
                setTimeout(() => {
                  setTimeout(() => {
                    setIsopenPopupCard(true);
                  }, 800);
                  setIsMenuOpen(false);
                }, 800);
              }}
              className="adminmobile__popup__menu__popup__con__btn"
            >
              <img
                alt="icon"
                className="adminmobile__popup__menu__popup__con__btn__img"
                src={NewFile}
              />
              <span className="adminmobile__popup__menu__popup__con__btn__span">
                Создать новый файл
              </span>
            </button>
            <button
              onClick={handleSubmit}
              className="adminmobile__popup__menu__popup__con__btn"
            >
              <img
                alt="icon"
                className="adminmobile__popup__menu__popup__con__btn__img"
                src={SignInIcon}
              />
              <span className="adminmobile__popup__menu__popup__con__btn__span">
                Выйти из панели
              </span>
            </button>
          </div>
          <div className="adminmobile__copyrite">
            <img src={Logo} alt="logo" className="adminmobile__copyrite__img" />
            <p className="adminmobile__copyrite__text">
              2024 © Copyright. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminMobile;
