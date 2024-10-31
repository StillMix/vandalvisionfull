import React, { useState, useEffect } from "react";
import "./AdminMobilePopupCard.css";
import NewImg from "../../images/Admin/newImg.svg";
import Arc from "../../images/Admin/arc.svg";
import Colorses from "../../images/Admin/capel.svg";
import Razmer from "../../images/Admin/razmer.svg";
import Star from "../../images/Admin/star.svg";
import AdminMobilePopupCardImg from "../AdminMobilePopupCardImg/AdminMobilePopupCardImg";
import api from "../../utils/Api";
import Arrow from "../../images/Admin/btnBack.svg";

function AdminMobilePopupCard(props) {
  const op = props.op || {};
  const card = props.card || {};

  const [formValues, setFormValues] = useState({
    NameInput: op.name ? op.name : "",
    ArcInput: op.arc ? op.arc : "",
    ColorsInput: op.colors ? op.colors : "",
    RazmerInput: op.razm ? op.razm : "",
    ImgInput: op.img ? op.img : "",
    ImgArcInput: op.imgArc ? op.imgArc : "",
    NewImg: "",
    NewImgArc: "",
    firstImage: "",
    lastImage: "",
    DiffInput: op.difficulty ? op.difficulty : "",
  });
  const [close, setClose] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [openImg, setOpenImg] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null); // Новый state для файла
  const [selectedFileArc, setSelectedFileArc] = useState(null); // Новый state для файла
  const [errorARC, setErrorARC] = useState(false); // Новый state для файла
  const [arcImg, setArcImg] = useState(false); // Новый state для файла
  const [arcImgOpen, setArcImgOpen] = useState(false); // Новый state для файла
  const [errorARCOpen, setErrorARCOpen] = useState(false); // Новый state для файла


  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 10); // Задержка для плавного появления
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  }

  function handleFileChange(e) {
    console.log(e.target.name);
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const img = new Image();
        img.src = reader.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          const ctx = canvas.getContext("2d");

          // Изменение размера изображения
          let width = img.width;
          let height = img.height;
          const maxWidth = 1920; // Максимальная ширина
          const maxHeight = 1920; // Максимальная высота
          const aspectRatio = width / height;

          if (width > maxWidth || height > maxHeight) {
            if (aspectRatio > 1) {
              width = maxWidth;
              height = Math.floor(width / aspectRatio);
            } else {
              height = maxHeight;
              width = Math.floor(height * aspectRatio);
            }
          }

          canvas.width = width;
          canvas.height = height;
          ctx.drawImage(img, 0, 0, width, height);

          // Конвертируем изображение в WebP
          canvas.toBlob((blob) => {
            const webpFile = new File(
              [blob],
              file.name.replace(/\.[^/.]+$/, ".webp"),
              {
                type: "image/webp",
              }
            );

            if (e.target.name === "imageInput") {
              setSelectedFile(webpFile);
              setFormValues((prevState) => ({
                ...prevState,
                NewImg: URL.createObjectURL(webpFile),
              }));
            }

            if (e.target.name === "imageInputOne") {
              setFormValues((prevState) => ({
                ...prevState,
                firstImage: URL.createObjectURL(webpFile),
              }));
            }

            if (e.target.name === "imageInputTwo") {
              setFormValues((prevState) => ({
                ...prevState,
                lastImage: URL.createObjectURL(webpFile),
              }));
            }

            if (e.target.name === "imageInputArc") {
              setSelectedFileArc(webpFile);
              setFormValues((prevState) => ({
                ...prevState,
                NewImgArc: URL.createObjectURL(webpFile),
              }));
            }
          }, "image/webp");
        };
      };
      reader.readAsDataURL(file);
    }
  }

  const mergeImages = (blobUrl1, blobUrl2) => {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const img1 = new Image();
    const img2 = new Image();
    
    img1.src = blobUrl1;
    img2.src = blobUrl2;
  
    img1.onload = () => {
      const width = img1.width;
      const height = img1.height + (img2.height || 0);
      canvas.width = width;
      canvas.height = height;
  
      ctx.drawImage(img1, 0, 0);
  
      img2.onload = () => {
        ctx.drawImage(img2, 0, img1.height);
        convertCanvasToWebP(canvas);
      };
    };
  };
  
  // Конвертация в WebP формат и передача в state как в handleFileChange
  const convertCanvasToWebP = (canvas) => {
    canvas.toBlob((blob) => {
      const webpFile = new File([blob], "mergedImage.webp", { type: "image/webp" });
  
      setFormValues((prevState) => ({
        ...prevState,
        NewImgArc: URL.createObjectURL(webpFile),
      }));
  
      setSelectedFileArc(webpFile);  // Если нужно сохранить как бинарный файл
    }, "image/webp");
  };
  
  
  // Генерация бинарного формата (File) из canvas и сохранение в нужном формате
  const generateCanvasBlob = (canvas) => {
    canvas.toBlob((blob) => {
      if (blob) {
        // Конвертируем Blob в File и сохраняем его как binary
        const binaryFile = new File([blob], "mergedImage.webp", { type: "image/webp" });
        setFormValues((prevState) => ({
          ...prevState,
          NewImgArc: binaryFile, // Передаем как binary
        }));
      } else {
        console.error("Ошибка: Blob не был создан.");
      }
    }, "image/webp");
  };
  
  
  // Генерация blob из canv
  
  
  

  function handleSubmit() {
    const hasSameArc = card.some(
      (i) =>
        i.arc.toLowerCase() === formValues.ArcInput.toLowerCase() &&
        i._id !== op._id
    );

    if (hasSameArc) {
      setErrorARC(true);
      setTimeout(() => {
        setErrorARCOpen(true);
      }, 800);
      return; // Не отправляем запрос, если артикул уже существует
    }
    const { NameInput, ArcInput, ColorsInput, RazmerInput, DiffInput } =
      formValues;
    const formData = new FormData();

    formData.append("name", NameInput);
    formData.append("arc", ArcInput);
    formData.append("razm", RazmerInput);
    formData.append("colors", ColorsInput);
    formData.append("difficulty", DiffInput);
    if (selectedFile) {
      formData.append("img", selectedFile); // Добавляем WebP файл
    }
    if (selectedFileArc) {
      formData.append("imgArc", selectedFileArc);
      // Добавляем WebP файл
    }

    if (props.op) {
      if (selectedFile && selectedFileArc) {
        api
          .patchCard(
            {
              name: NameInput,
              arc: ArcInput,
              razm: RazmerInput,
              colors: ColorsInput,
              difficulty: DiffInput,
              imgFile: selectedFile,
              imgArc: selectedFileArc, // Передаем WebP файл через API
            },
            op._id
          )
          .then((data) => {
            props.setCards();
            setClose(true);
            setTimeout(() => {
              props.setIsopenPopupCard(false);
              props.setPopupCardOp("");
            }, 500);
          })
          .catch((error) => {
            console.error("Ошибка при загрузке данных:", error);
          });
      }

      api
        .patchCard(
          {
            name: NameInput,
            arc: ArcInput,
            razm: RazmerInput,
            colors: ColorsInput,
            difficulty: DiffInput,
            imgFile: selectedFile ? selectedFile : "",
            imgArc: selectedFileArc ? selectedFileArc : "", // Передаем WebP файл через API
          },
          op._id
        )
        .then((data) => {
          props.setCards();
          setClose(true);
          setTimeout(() => {
            props.setIsopenPopupCard(false);
            props.setPopupCardOp("");
          }, 500);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных:", error);
        });
    } else {
      api
        .addCard({
          name: NameInput,
          arc: ArcInput,
          razm: RazmerInput,
          colors: ColorsInput,
          difficulty: DiffInput,
          imgFile: selectedFile, // Передаем WebP файл через API
          imgArc: selectedFileArc,
        })
        .then(() => {
          props.setCards();
          setClose(true);
          setTimeout(() => {
            props.setIsopenPopupCard(false);
            props.setPopupCardOp("");
          }, 500);
        })
        .catch((error) => {
          console.error("Ошибка при загрузке данных:", error);
        });
    }
  }

  const [slideDirection, setSlideDirection] = useState("right");

  const toggleImage = (direction) => {
    setSlideDirection(direction === "left" ? "right" : "left");
  };
  return (
    <div
      className={`adminpopupcardmobile ${isMounted && !close ? "in" : "out"} ${
        openImg ? "imgOpen" : ""
      }`}
    >
      <div className="adminpopupcardmobile__popup">
        <div className="adminpopupcard__popup__slidermob">
          <div
            className={`adminpopupcardmobile__popup__img ${
              slideDirection === "left" ? "left" : ""
            } ${
              formValues.NewImg
                ? ""
                : formValues.ImgInput
                ? ""
                : "adminpopupcardmobile__popup__img__nondisable"
            }`}
            style={{
              backgroundImage: formValues.NewImg
                ? `url(${formValues.NewImg})`
                : `url(https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${formValues.ImgInput})`,
            }}
          >
            <div className="adminpopupcardmobile__popup__img__container">
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange} // Вызываем новый обработчик
                className="adminpopupcardmobile__popup__img__container__file-input"
                placeholder=""
                id="imageInput"
              />
              <label htmlFor="imageInput">
                <div className="adminpopupcardmobile__popup__img__container__content">
                  <img
                    alt="icon"
                    className="adminpopupcardmobile__popup__img__container__img"
                    src={NewImg}
                  />
                  <p className="adminpopupcardmobile__popup__img__container__text">
                    Загрузить новое изображение
                  </p>
                </div>
              </label>
            </div>
          </div>
          <div
            className={`adminpopupcardmobile__popup__img ${
              formValues.NewImg
                ? ""
                : formValues.ImgInput
                ? ""
                : "adminpopupcardmobile__popup__img__nondisable"
            }`}
            style={{
              backgroundImage: formValues.NewImg
                ? `url(${formValues.NewImg})`
                : `url(https://vandalvisionteam-vandalvision-server-7ee0.twc1.net${formValues.ImgArcInput})`,
            }}
            onClick={() => {
              setArcImg(true);
              setTimeout(() => {
                setArcImgOpen(true);
              }, 100);
            }}
          >
            <div className="adminpopupcardmobile__popup__img__container">

              <label >
                <div className="adminpopupcardmobile__popup__img__container__content">
                  <img
                    alt="icon"
                    className="adminpopupcardmobile__popup__img__container__img"
                    src={NewImg}
                  />
                  <p className="adminpopupcardmobile__popup__img__container__text">
                    Загрузить карту цветов
                  </p>
                </div>
              </label>
            </div>
          </div>

          <div className="adminpopupcard__popup__img__control">
            <img
              className={`adminpopupcard__popup__img__control__left ${slideDirection === "left" ? "none" : "" }`}
              alt="icon"
              src={Arrow}
              onClick={() => toggleImage("right")}
            />
            <img
              className={`adminpopupcard__popup__img__control__right ${slideDirection === "left" ? "" : "none" }`}
              alt="icon"
              src={Arrow}
              onClick={() => toggleImage("left")}
            />
          </div>
        </div>
        <div className="adminpopupcardmobile__popup__container">
          <input
            className="adminpopupcardmobile__popup__container__title"
            type="text"
            value={formValues.ArcInput}
            onChange={handleChange}
            name="ArcInput"
            placeholder="Введите артикул"
          />
          <div className="adminpopupcardmobile__popup__container__element">
            <img
              alt="icon"
              src={Razmer}
              className="adminpopupcardmobile__popup__container__element__img"
            />
            <p className="adminpopupcardmobile__popup__container__element__text">
              Артикул:
            </p>
            <input
              className="adminpopupcardmobile__popup__container__element__input"
              type="text"
              value={formValues.NameInput}
              onChange={handleChange}
              name="NameInput"
              placeholder="Придумайте название"
            />
          </div>
          <div className="adminpopupcardmobile__popup__container__element">
            <img
              alt="icon"
              src={Colorses}
              className="adminpopupcardmobile__popup__container__element__img"
            />
            <p className="adminpopupcardmobile__popup__container__element__text">
              Цветов:
            </p>
            <input
              className="adminpopupcardmobile__popup__container__element__input"
              type="text"
              value={formValues.ColorsInput}
              onChange={handleChange}
              name="ColorsInput"
              placeholder="Введите количество цветов"
            />
          </div>
          <div className="adminpopupcardmobile__popup__container__element">
            <img
              alt="icon"
              src={Arc}
              className="adminpopupcardmobile__popup__container__element__img"
            />
            <p className="adminpopupcardmobile__popup__container__element__text">
              Размер:
            </p>
            <input
              className="adminpopupcardmobile__popup__container__element__input"
              type="text"
              value={formValues.RazmerInput}
              onChange={handleChange}
              name="RazmerInput"
              placeholder="Введите размер"
            />
          </div>
          <div className="adminpopupcardmobile__popup__container__element">
            <img
              alt="icon"
              src={Star}
              className="adminpopupcardmobile__popup__container__element__img"
            />
            <p className="adminpopupcardmobile__popup__container__element__text">
              Сложность:
            </p>
            <button
              disabled={formValues.DiffInput === "eazy"}
              onClick={() => {
                setFormValues({
                  ...formValues,
                  DiffInput: "eazy",
                });
              }}
              className={`adminpopupcardmobile__popup__container__element__diff ${
                formValues.DiffInput === "eazy" && "green"
              }`}
            >
              Низкая
            </button>
            <button
              disabled={formValues.DiffInput === "normal"}
              onClick={() => {
                setFormValues({
                  ...formValues,
                  DiffInput: "normal",
                });
              }}
              className={`adminpopupcardmobile__popup__container__element__diff ${
                formValues.DiffInput === "normal" && "yellow"
              }`}
            >
              Средняя
            </button>
            <button
              disabled={formValues.DiffInput === "hard"}
              onClick={() => {
                setFormValues({
                  ...formValues,
                  DiffInput: "hard",
                });
              }}
              className={`adminpopupcardmobile__popup__container__element__diff ${
                formValues.DiffInput === "hard" && "red"
              }`}
            >
              Высокая
            </button>
          </div>
          <button
            onClick={handleSubmit}
            className="adminpopupcardmobile__popup__container__btns__btn"
          >
            Применить
          </button>
          <button
            onClick={() => {
              setClose(true);
              setTimeout(() => {
                props.setIsopenPopupCard(false);
                props.setPopupCardOp("");
              }, 500);
            }}
            className="adminpopupcardmobile__popup__container__btns__btn"
          >
            Отменить
          </button>
        </div>
        {openImg && (
          <AdminMobilePopupCardImg
            setForm={setFormValues}
            op={formValues.ImgInput}
            setCloseImg={setOpenImg}
          />
        )}
      </div>
      {errorARC && (
        <div className={`error ${errorARCOpen ? "in" : "out"}`}>
          <div className="error__popup">
            <p className="error__popup__title">Такой артикул уже существует</p>
            <button
              onClick={() => {
                setErrorARCOpen(false);
                setTimeout(() => {
                  setErrorARC(false);
                }, 800);
              }}
              className="error__popup__bck"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

{arcImg && (
        <div className={`imgpopupMobile ${arcImgOpen ? "in" : "out"}`}>
          <div className="imgpopupMobile__popup">
            <div
              className={`imgpopupMobile__popup__img ${
                formValues.firstImage
                  ? ""
                  : formValues.lastImage
                  ? ""
                  : "imgpopupMobile__popup__img__nondisable"
              }`}
              style={{
                backgroundImage: formValues.firstImage
                  ? `url(${formValues.firstImage})`
                  : ``,
              }}
            >
              <div className="imgpopupMobile__popup__img__container">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="imgpopupMobile__popup__img__container__file-input"
                  placeholder=""
                  id="imageInput"
                  name="imageInputOne"
                />
                <label htmlFor="imageInput">
                  <div className="imgpopupMobile__popup__img__container__content">
                    <img
                      alt="icon"
                      className="imgpopupMobile__popup__img__container__img"
                      src={NewImg}
                    />
                    <p className="imgpopupMobile__popup__img__container__text">
                      Загрузить первое изображение
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <div
              className={`imgpopupMobile__popup__img ${
                formValues.firstImage
                  ? ""
                  : formValues.lastImage
                  ? ""
                  : "imgpopupMobile__popup__img__nondisable"
              }`}
              style={{
                backgroundImage: formValues.lastImage
                  ? `url(${formValues.lastImage})`
                  : ``,
              }}
            >
              <div className="imgpopupMobile__popup__img__container ">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="imgpopupMobile__popup__img__container__file-input"
                  placeholder=""
                  id="imageInputArc"
                  name="imageInputTwo"
                />
                <label htmlFor="imageInputArc">
                  <div className="imgpopupMobile__popup__img__container__content">
                    <img
                      alt="icon"
                      className="imgpopupMobile__popup__img__container__img"
                      src={NewImg}
                    />
                    <p className="imgpopupMobile__popup__img__container__text">
                      Загрузить второе изображение
                    </p>
                  </div>
                </label>
              </div>
            </div>
            <button
              onClick={() => {
                if (formValues.firstImage && formValues.lastImage) {
                  mergeImages(formValues.firstImage, formValues.lastImage);
                  setArcImgOpen(false);
                  setTimeout(() => {
                    setArcImg(false);
                    setFormValues((prevState) => ({
                      ...prevState,
                      lastImage: "",
                      firstImage: ""
                    }));
                  }, 800);
                }
              }}
              className="imgpopupMobile__popup__save"
              disabled={!formValues.firstImage && !formValues.lastImage}
            >
              Сохранить
            </button>
            
            <button
              onClick={() => {
                setArcImgOpen(false);
                setTimeout(() => {
                  setArcImg(false);
                  setFormValues((prevState) => ({
                    ...prevState,
                    lastImage: "",
                    firstImage: ""
                  }));
                }, 800);
              }}
              className="imgpopupMobile__popup__bck"
            >
              Закрыть
            </button>
 
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminMobilePopupCard;
