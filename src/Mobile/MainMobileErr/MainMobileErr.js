import React from "react";
import "./MainMobileErr.css";


function MainMobileErr(props) {
    function handleBackToStart() {
        props.setIsError(false);
        props.setIsFound(false);
        props.setIsClosingStart(false);
        props.setIsLoading(false);
        props.setFormValues({ ArticulInput: "" });
      }
  return (
    <div className={`mainmobile__err ${props.isClosingErr ? "fade-out" : "fade-in"}`}>
    <p className="mainmobile__err__title">
      Артикул не найден. Попробуйте снова.
    </p>
    <button
      onClick={handleBackToStart}
      className="mainmobile__err__back__btn"
    >
      Назад на главную
    </button>
  </div>
  );
}

export default MainMobileErr;
