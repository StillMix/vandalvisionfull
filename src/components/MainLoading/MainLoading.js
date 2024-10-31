import React from "react";
import "./MainLoading.css";
import ErrG from "../../images/Main/errG.svg";
import SearchW from "../../images/Main/searchW.svg";

function MainLoading(props) {
  return (
    <div
      className={`main__loading ${props.isClosingLoading ? "fade-out" : "fade-in"}`}
    >
      <p className="main__loading__title">
        <img className="main__loading__title__img" alt="icon" src={SearchW} />
        <span className="main__loading__title__span__title">
          Выполняется поиск
        </span>
        <span className="main__loading__title__span">.</span>
        <span className="main__loading__title__span">.</span>
        <span className="main__loading__title__span">.</span>
      </p>
      <p className={`main__loading__err ${props.isLoadingDolg ? "fade-in" : ""}`}>
        <img alt="icon" className="main__loading__err__img" src={ErrG} />
        <span>
          Поиск идёт дольше чем ожидалось. Проверьте соединение или повторите
          попытку позже
        </span>
      </p>
    </div>
  );
}

export default MainLoading;
