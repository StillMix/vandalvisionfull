import React from "react";
import "./SignInMobilePopup.css";


import Like from "../../images/SignIn/like.svg";

function SignInMobile(props) {
  function handleCloseQuest() {
    props.setIsClosing(true);
    setTimeout(() => {
      props.setIsQuestOpen(false);
      props.setIsClosing(false);
    }, 500);
  }

  return (
    <div
      className={`signinmobile__popup__containerImgQuest ${
        props.isClosing ? "fade-out" : "fade-in"
      }`}
    >
      <div
        className={`signinmobile__popup__containerImgQuest__popup ${
          props.isClosing ? "slide-down" : "slide-up"
        }`}
      >
        <div className="signinmobile__popup__containerImgQuest__popup__containerText">
          <p className="signinmobile__popup__containerImgQuest__popup__containerText__title">
          Увы. Сбросить пароль можно только через главного администратора
          </p>
          <p className="signinmobile__popup__containerImgQuest__popup__containerText__subtitle">
          Самостоятельно сбросить неполучится. Вам необходимо запросить разрешения у главного администратора для сброса пароля.
          </p>
        </div>
          <button
            className="signinmobile__popup__containerImgQuest__popup__containerBtn__btn"
            onClick={handleCloseQuest}
          >
            <img
              alt="icon"
              className="signinmobile__popup__containerImgQuest__popup__containerBtn__btn__img"
              src={Like}
            />
            Теперь понятно
          </button>
      </div>
    </div>
  );
}

export default SignInMobile;
