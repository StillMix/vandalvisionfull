import React, { useEffect, useState } from "react";
import "./Admin.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/Admin/logo.svg";
import SignInIcon from "../../images/Admin/signin.svg";
import NewFile from "../../images/Admin/newfile.svg";
import Person from "../../images/Admin/person.svg";
import Arc from "../../images/Admin/arc.svg";
import Colorses from "../../images/Admin/capel.svg";
import Razmer from "../../images/Admin/razmer.svg";
import Star from "../../images/Admin/star.svg";
import Menu from "../../images/Admin/menu.svg";
import Arrow from "../../images/Admin/arrow.svg";
import AdminPopupCard from "../AdminPopupCard/AdminPopupCard";
import AdminPopupPersons from "../AdminPopupPersons/AdminPopupPersons";
import api from "../../utils/Api";
import AdminDel from "../AdminDel/AdminDel";
import Del from "../../images/Admin/del.svg";

function Admin(props) {
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

  const [isChecked, setIsChecked] = useState([]);
  const [del, setDel] = useState(false);
  const [delOpen, setDelOpen] = useState(false);

  const handleCheckboxChange = (id) => {
    setIsChecked((prev) => {
      // Проверяем, если id уже есть в массиве, то убираем его, иначе добавляем
      if (prev.includes(id)) {
        return prev.filter((checkedId) => checkedId !== id); // Убираем id, если уже есть
      } else {
        return [...prev, id]; // Добавляем id, если его нет
      }
    });
    console.log(isChecked);
  };

  useEffect(() => {
    console.log("isChecked изменен:", isChecked); // Отслеживаем изменения isChecked
  }, [isChecked]);

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
        setTimeout(() => {
          navigate("/signin");
        }, 20);
      }, 2000);
    }
  }

  const filteredCards = Array.isArray(card)
    ? card.filter((i) => i.arc.toLowerCase().includes(searchTerm.toLowerCase()))
    : [];

  return (
    <>
      <div className="admin for1024">
        <div
          className={`admin__popup ${
            isFormStart ? "fade-out" : isFirstForm ? "fade-in" : null
          }`}
        >
          <div
            className={`admin__start ${
              isClosingStart ? "fade-out" : "fade-in"
            }`}
          >
            <div className="admin__start__header">
              <p className="admin__start__header__title">
                Панель администратора
                <span>
                  {admins ? "Senior Administrator" : "Standard employee"}
                </span>
              </p>
              {isChecked.length > 0 && (
                <button onClick={() => {
                  setDel(true);
                  setTimeout(() => {
                    console.log(isChecked);
                    setDelOpen(true);
                    console.log(del, delOpen);
                  }, 100);
                }} className="admin__start__header__btndel">
                  <img
                    className="admin__start__header__btndel__img"
                    alt="icon"
                    src={Del}
                  />
                </button>
              )}
              <button
                type="button"
                onClick={handleSubmit}
                className="admin__start__header__btn"
              >
                <img
                  alt="icon"
                  className="admin__start__header__btn__img"
                  src={SignInIcon}
                />
                Выйти из панели администратора
              </button>
            </div>
            <div className="admin__start__btns">
              <input
                placeholder="Поиск артикуля"
                type="text"
                className="admin__start__btns__input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button
                onClick={() => {
                  setIsopenPopupCard(true);
                }}
                className="admin__start__btns__new"
              >
                <img
                  alt="icon"
                  src={NewFile}
                  className="admin__start__btns__new__img"
                />
                <span className="admin__start__btns__new__span">
                  Создать новый файл
                </span>
              </button>
              {admins ? (
                <button
                  onClick={() => {
                    setIsPersonOpen(true);
                  }}
                  className="admin__start__btns__person"
                >
                  <img
                    alt="icon"
                    src={Person}
                    className="admin__start__btns__person__img"
                  />
                  <span className="admin__start__btns__person__span">
                    Сотрудники
                  </span>
                </button>
              ) : null}
            </div>
            <div className="admin__start__cards">
              {filteredCards.map((i, index) => (
                <div key={index} className="admin__start__cards__card">
                  <input
                    type="checkbox"
                    id={`customCheckbox-${index}`}
                    className="admin__start__cards__card__input"
                    checked={isChecked.includes(i._id)}
                    onChange={() => handleCheckboxChange(i._id)}
                  />
                  <label htmlFor={`customCheckbox-${index}`}></label>
                  <img
                    loading="lazy"
                    alt="cardImg"
                    src={`https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${i.img}`}
                    className="admin__start__cards__card__img"
                  />
                  <div className="admin__start__cards__card__conimg"> </div>
                  <div className="admin__start__cards__card__opcon">
                    <p className="admin__start__cards__card__opcon__title">
                      {i.arc}
                    </p>
                    <div className="admin__start__cards__card__opcon_op">
                      <div className="admin__start__cards__card__opcon_op__containerone">
                        <p className="admin__start__cards__card__opcon_op__containerone__text">
                          <img
                            alt="icon"
                            src={Razmer}
                            className="admin__start__cards__card__opcon_op__containerone__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containerone__text__span">
                            Название: {i.name}
                          </span>
                        </p>
                        <p className="admin__start__cards__card__opcon_op__containerone__text">
                          <img
                            alt="icon"
                            src={Colorses}
                            className="admin__start__cards__card__opcon_op__containerone__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containerone__text__span">
                            Цветов: {i.colors}
                          </span>
                        </p>
                      </div>
                      <div className="admin__start__cards__card__opcon_op__containertwo">
                        <p className="admin__start__cards__card__opcon_op__containertwo__text">
                          <img
                            alt="icon"
                            src={Arc}
                            className="admin__start__cards__card__opcon_op__containertwo__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containertwo__text__span">
                            Размер: {i.razm}
                          </span>
                        </p>
                        <p className="admin__start__cards__card__opcon_op__containertwo__text">
                          <img
                            alt="icon"
                            src={Star}
                            className="admin__start__cards__card__opcon_op__containertwo__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containertwo__text__span">
                            Сложность:
                            <span
                              className={`admin__start__cards__card__opcon_op__containertwo__text__span__diff ${
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
                    <div className="admin__start__cards__card__opcon__btns">
                      <button
                        className="admin__start__cards__card__opcon__btns__btn"
                        onClick={() => {
                          setIsopenPopupCard(true);
                          setPopupCardOp(i);
                        }}
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => {
                          setIsChecked([i._id]); // Теперь isChecked всегда будет массивом с одним элементом
                          setDel(true);
                          setTimeout(() => {
                            console.log(isChecked); // Это может ещё не показать изменения из-за асинхронности setState
                            setDelOpen(true);
                            console.log(del, delOpen);
                          }, 100);
                        }}
                        className="admin__start__cards__card__opcon__btns__btn"
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
            <AdminPopupCard
              card={card}
              setCards={setCards}
              setPopupCardOp={setPopupCardOp}
              setIsopenPopupCard={setIsopenPopupCard}
              op={PopupCardOp}
            />
          ) : null}
          {isPersonOpen ? (
            <AdminPopupPersons setIsPersonOpen={setIsPersonOpen} />
          ) : null}

          {del && (
            <AdminDel
              setDelOpen={setDelOpen}
              setDel={setDel}
              delOpen={delOpen}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              setCards={setCards}
            />
          )}
        </div>
        <div className="admin__copyrite">
          <img src={Logo} alt="logo" className="admin__copyrite__img" />
          <p className="admin__copyrite__text">
            2024 © Copyright. All rights reserved
          </p>
        </div>
      </div>
      <div className="admin for768">
        <div
          className={`admin__popup ${
            isFormStart ? "fade-out" : isFirstForm ? "fade-in" : null
          }`}
        >
          <div
            className={`admin__start ${
              isClosingStart ? "fade-out" : "fade-in"
            }`}
          >
            <div className="admin__start__header">
              <p className="admin__start__header__title">
                Панель администратора
                <span>{admins ? "SA" : "SE"}</span>
              </p>
              {isChecked.length > 0 && (
                <button onClick={() => {
                  setDel(true);
                  setTimeout(() => {
                    console.log(isChecked);
                    setDelOpen(true);
                    console.log(del, delOpen);
                  }, 100);
                }} className="admin__start__header__btndel">
                  <img
                    className="admin__start__header__btndel__img"
                    alt="icon"
                    src={Del}
                  />
                </button>
              )}
              <button
                className="admin__start__header__btn"
                onClick={() => {
                  setIsMenuOpen(true);
                  setTimeout(() => {
                    setIsMenuOpenPopup(true);
                  }, 800);
                }}
              >
                <img
                  src={Menu}
                  className="admin__start__header__btn__img"
                  alt="icon"
                />
              </button>
            </div>
            <div className="admin__start__btns">
              <input
                placeholder="Поиск артикуля"
                type="text"
                className="admin__start__btns__input"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="admin__start__cards">
              {filteredCards.map((i, index) => (
                <div
                  key={index}
                  style={{
                    backgroundImage: `url(https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${i.img})`,
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                  className="admin__start__cards__card"
                >
                  <input
                    type="checkbox"
                    id={`customCheckbox-${index}`}
                    className="admin__start__cards__card__input"
                    checked={isChecked.includes(i._id)}
                    onChange={() => handleCheckboxChange(i._id)}
                  />
                  <label htmlFor={`customCheckbox-${index}`}></label>

                  <div className="admin__start__cards__card_backimg"> </div>
                  <div className="admin__start__cards__card__conimg"> </div>
                  <div className="admin__start__cards__card__opcon">
                    <p className="admin__start__cards__card__opcon__title">
                      {i.arc}
                    </p>
                    <div className="admin__start__cards__card__opcon_op">
                      <div className="admin__start__cards__card__opcon_op__containerone">
                        <p className="admin__start__cards__card__opcon_op__containerone__text">
                          <img
                            alt="icon"
                            src={Razmer}
                            className="admin__start__cards__card__opcon_op__containerone__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containerone__text__span">
                            Название: {i.name}
                          </span>
                        </p>
                        <p className="admin__start__cards__card__opcon_op__containerone__text">
                          <img
                            alt="icon"
                            src={Colorses}
                            className="admin__start__cards__card__opcon_op__containerone__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containerone__text__span">
                            Цветов: {i.colors}
                          </span>
                        </p>
                      </div>
                      <div className="admin__start__cards__card__opcon_op__containertwo">
                        <p className="admin__start__cards__card__opcon_op__containertwo__text">
                          <img
                            alt="icon"
                            src={Arc}
                            className="admin__start__cards__card__opcon_op__containertwo__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containertwo__text__span">
                            Размер: {i.razm}
                          </span>
                        </p>
                        <p className="admin__start__cards__card__opcon_op__containertwo__text">
                          <img
                            alt="icon"
                            src={Star}
                            className="admin__start__cards__card__opcon_op__containertwo__text__img"
                          />
                          <span className="admin__start__cards__card__opcon_op__containertwo__text__span">
                            Сложность:
                            <span
                              className={`admin__start__cards__card__opcon_op__containertwo__text__span__diff ${
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
                    <div className="admin__start__cards__card__opcon__btns">
                      <button
                        className="admin__start__cards__card__opcon__btns__btn"
                        onClick={() => {
                          console.log("ds");
                          setIsopenPopupCard(true);
                          setPopupCardOp(i);
                        }}
                      >
                        Редактировать
                      </button>
                      <button
                        onClick={() => {
                          setDel(true);
                          setTimeout(() => {
                            setDelOpen(true);
                            console.log(del, delOpen);
                          }, 100);
                          setIsChecked([i._id]);
                        }}
                        className="admin__start__cards__card__opcon__btns__btn"
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
            <AdminPopupCard
              card={card}
              setCards={setCards}
              setPopupCardOp={setPopupCardOp}
              setIsopenPopupCard={setIsopenPopupCard}
              op={PopupCardOp}
            />
          ) : null}
          {isPersonOpen ? (
            <AdminPopupPersons setIsPersonOpen={setIsPersonOpen} />
          ) : null}

          {del && (
            <AdminDel
              setDelOpen={setDelOpen}
              setDel={setDel}
              delOpen={delOpen}
              isChecked={isChecked}
              setIsChecked={setIsChecked}
              setCards={setCards}
            />
          )}
        </div>

        <div
          className={`admin__popup__menu ${
            isMenuOpen ? "open" : isMenuOpenOne ? "close" : null
          }`}
        >
          <div
            className={`admin__popup__menu__popup ${
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
              className="admin__popup__menu__popup__btn"
            >
              <img
                alt="icon"
                src={Arrow}
                className="admin__popup__menu__popup__btn__img"
              />
            </button>
            <div className="admin__popup__menu__popup__con">
              <p className="admin__popup__menu__popup__con__tip">
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
                  className="admin__popup__menu__popup__con__btn"
                >
                  <img
                    alt="icon"
                    className="admin__popup__menu__popup__con__btn__img"
                    src={Person}
                  />
                  <span className="admin__popup__menu__popup__con__btn__span">
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
                className="admin__popup__menu__popup__con__btn"
              >
                <img
                  alt="icon"
                  className="admin__popup__menu__popup__con__btn__img"
                  src={NewFile}
                />
                <span className="admin__popup__menu__popup__con__btn__span">
                  Создать новый файл
                </span>
              </button>
              <button
                onClick={handleSubmit}
                className="admin__popup__menu__popup__con__btn"
              >
                <img
                  alt="icon"
                  className="admin__popup__menu__popup__con__btn__img"
                  src={SignInIcon}
                />
                <span className="admin__popup__menu__popup__con__btn__span">
                  Выйти из панели
                </span>
              </button>
            </div>
            <div className="admin__copyrite">
              <img src={Logo} alt="logo" className="admin__copyrite__img" />
              <p className="admin__copyrite__text">
                2024 © Copyright. All rights reserved
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
