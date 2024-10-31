import React from "react";
import "./MainPopup.css";

import Quest from "../../images/Main/imgQuest.png";
import Like from "../../images/Main/like.svg";

function MainPopup(props) {
  function handleCloseQuest() {
    props.setIsClosing(true);
    setTimeout(() => {
      props.setIsQuestOpen(false);
      props.setIsClosing(false);
    }, 500);
  }

  return (
    <div
      className={`main__popup__containerImgQuest ${
        props.isClosing ? "fade-out" : "fade-in"
      }`}
    >
      <div
        className={`main__popup__containerImgQuest__popup ${
          props.isClosing ? "slide-down" : "slide-up"
        }`}
      >
        <img
          alt="img"
          className="main__popup__containerImgQuest__popup__img"
          src={Quest}
        />
        <div className="main__popup__containerImgQuest__popup__containerText">
          <p className="main__popup__containerImgQuest__popup__containerText__title">
            Найти артикул не сложно
          </p>
          <p className="main__popup__containerImgQuest__popup__containerText__subtitle">
            Достаточно отыскать соответствующую надпись на задней или лицевой
            стороне. Это и будет артикул.
          </p>
        </div>
        <div className="main__popup__containerImgQuest__popup__containerBtn">
          <button
            className="main__popup__containerImgQuest__popup__containerBtn__btn"
            onClick={handleCloseQuest}
          >
            <img
              alt="icon"
              className="main__popup__containerImgQuest__popup__containerBtn__btn__img"
              src={Like}
            />
            Теперь понятно
          </button>
        </div>
      </div>
    </div>
  );
}

export default MainPopup;
