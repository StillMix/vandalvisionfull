import React from "react";
import "./MainMobileLoading.css";
import ErrG from "../../images/Main/errG.svg";
import SearchW from "../../images/Main/searchW.svg";

function MainMobileLoading(props) {
  return (
    <div
      className={`mainmobile__loading ${props.isClosingLoading ? "fade-out" : "fade-in"}`}
    >
      <p className="mainmobile__loading__title">
        <img className="mainmobile__loading__title__img" alt="icon" src={SearchW} />
        <span className="mainmobile__loading__title__span__title">
          Выполняется поиск
        </span>
        <span className="mainmobile__loading__title__span">.</span>
        <span className="mainmobile__loading__title__span">.</span>
        <span className="mainmobile__loading__title__span">.</span>
      </p>
      <p className={`mainmobile__loading__err ${props.isLoadingDolg ? "fade-in" : ""}`}>
        <img alt="icon" className="mainmobile__loading__err__img" src={ErrG} />
        <span>
          Поиск идёт дольше чем ожидалось. Проверьте соединение или повторите
          попытку позже
        </span>
      </p>
    </div>
  );
}

export default MainMobileLoading;
