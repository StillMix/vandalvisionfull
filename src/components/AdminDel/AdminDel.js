import React, { useEffect, useState } from "react";
import "./AdminDel.css";
import api from "../../utils/Api";

function AdminDel(props) {
  const [isChecked, setIsChecked] = useState(
    props.isChecked ? props.isChecked : []
  );

  useEffect(() => {
    console.log("isChecked изменен:", isChecked); // Отслеживаем изменения isChecked
  }, [isChecked]);

  useEffect(() => {
    console.log("props.isChecked изменен:", props.isChecked); // Отслеживаем изменения isChecked
  }, [props.isChecked]);

  function deleteCard() {
    // Проверяем, что каждый id — это строка длиной 24 символа
    if (
      !Array.isArray(props.isChecked) ||
      props.isChecked.some((id) => typeof id !== "string" || id.length !== 24)
    ) {
      console.error("Некорректные id для удаления:", props.isChecked);
      return;
    }
    api
      .deleteCard(props.isChecked)
      .then((data) => {
        if (data) {
          props.setCards();
          props.setDelOpen(false);
          setTimeout(() => {
            props.setDel(false);
            props.setIsChecked([]);
          }, 800);
        }
      })
      .catch((error) => {
        console.error("Ошибка при удалении карточки:", error);
      });
  }

  return (
    <div className={`AdminDel ${props.delOpen ? "in" : "out"}`}>
      <div className="AdminDel__popup">
        <p className="AdminDel__popup__title">
          Точно удалить? {props.isChecked.length} объектов
        </p>
        <button
          onClick={() => {
            props.setDelOpen(false);
            setTimeout(() => {
              props.setDel(false);
              props.setIsChecked([]);
            }, 800);
          }}
          className="AdminDel__popup__bck"
        >
          Закрыть
        </button>
        <button
          onClick={() => {
            deleteCard(props.isChecked);
          }}
          className="AdminDel__popup__del"
        >
          удалить
        </button>
      </div>
    </div>
  );
}

export default AdminDel;
