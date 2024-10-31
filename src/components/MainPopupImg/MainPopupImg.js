import React, { useState, useEffect } from "react";
import "./MainPopupImg.css";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import NoFullScreen from "../../images/Main/noFullScreen.svg";
import Arrow from "../../images/Main/btnBack.svg";
import Download from "../../images/Main/download.svg";

function MainPopupImg(props) {
  const [currentImage, setCurrentImage] = useState(0); // индекс текущего изображения
  const card = props.goodCard ? props.goodCard : "";

  function toggleFullScreen() {
    props.setIsFullScreenAnim(!props.isFullScreenAnim);
    props.setIsFirst(false);
    props.setIsFullScreen(!props.isFullScreen);
    setTimeout(() => {
      props.setIsPopup(false);
    }, 2000);
  }

  const images = [
    `https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${card.img}`,
    `https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${card.imgArc}`,
  ];

  const handleNext = () => {
    setCurrentImage((prevIndex) => {
      const newIndex = (prevIndex + 1) % images.length;
      console.log("Новый индекс (Next):", newIndex);
      return newIndex;
    });
  };

  const handlePrev = () => {
    setCurrentImage((prevIndex) => {
      const newIndex = prevIndex === 0 ? images.length - 1 : prevIndex - 1;
      console.log("Новый индекс (Prev):", newIndex);
      return newIndex;
    });
  };

  console.log("Текущее изображение:", images[currentImage]); // Выводи текущее изображение для проверки

  useEffect(() => {
    console.log("Изображения:", images);
    console.log("Текущий индекс:", currentImage);
  }, [images]);

  const handleDownload = async () => {
    const currentImgSrc = images[currentImage];
    const response = await fetch(currentImgSrc);
    const blob = await response.blob();

    // Создаем URL для Blob
    const url = URL.createObjectURL(blob);
    
    // Создаем элемент <a> для скачивания
    const a = document.createElement('a');
    a.href = url;
    a.download = `image-${currentImage + 1}.png`; // Устанавливаем имя файла
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    
    // Освобождаем созданный URL
    URL.revokeObjectURL(url);
  };

  return (
    <div className={`popupOpenImg`}>
      <TransformWrapper
        defaultScale={1}
        doubleClick={{ mode: "zoomIn" }}
        wheel={{ step: 0.1 }}
        pan={{ disabled: false }} // панорамирование включено
        pinch={{ disabled: false }} // pinch-to-zoom включён
      >
        {({ zoomIn, zoomOut, resetTransform }) => (
          <>
            <TransformComponent>
              <div className="sliderContainer">
                {images.map((src, index) => (
                  <img
                    key={index}
                    alt={`img-${index}`}
                    src={src}
                    className={`popupOpenImg__img ${
                      index === currentImage ? "active" : ""
                    }`}
                    style={{
                      display: index === currentImage ? "block" : "none", // Убираем элемент из потока
                    }}
                  />
                ))}
              </div>
            </TransformComponent>
            <div className="popupOpenImg__op__containerBtn">
            <button
                className="popupOpenImg__op__containerBtn__btndown"
                onClick={handleDownload}
              >
                <img
                  alt="icon"
                  src={Download}
                  className="popupOpenImg__op__containerBtn__btn__img"
                />
                <span>Скачать</span>
              </button>
              <button
                className="popupOpenImg__op__containerBtn__btn"
                onClick={toggleFullScreen}
              >
                <img
                  alt="icon"
                  src={NoFullScreen}
                  className="popupOpenImg__op__containerBtn__btn__img"
                />
                <span>Свернуть</span>
              </button>
            </div>

            <div className="sliderControls">
              <button onClick={handlePrev} className="sliderBtn">
                <img src={Arrow} alt="icon" className="sliderBtn__arrowleft"/>
              </button>
              <button onClick={handleNext} className="sliderBtn">
              <img src={Arrow} alt="icon" className="sliderBtn__arrowright"/>
              </button>
            </div>
          </>
        )}
      </TransformWrapper>
    </div>
  );
}

export default MainPopupImg;
