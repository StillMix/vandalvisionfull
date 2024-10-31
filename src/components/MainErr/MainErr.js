import React from "react";
import "./MainErr.css";


function MainErr(props) {
    function handleBackToStart() {
        props.setIsError(false);
        props.setIsFound(false);
        props.setIsClosingStart(false);
        props.setIsLoading(false);
        props.setFormValues({ ArticulInput: "" });
      }
  return (
    <div className={`main__err ${props.isClosingErr ? "fade-out" : "fade-in"}`}>
    <p className="main__err__title">
      Артикул не найден. Попробуйте снова.
    </p>
    <button
      onClick={handleBackToStart}
      className="main__err__back__btn"
    >
      Назад на главную
    </button>
  </div>
  );
}

export default MainErr;
