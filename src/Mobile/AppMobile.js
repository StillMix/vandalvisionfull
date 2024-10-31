import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./AppMobile.css";
import Loading from "./Loading/Loading";
import MainMobile from "./MainMobile/MainMobile";
import SignInMobile from "./SignInMobile/SignInMobile";
import AdminMobile from "./AdminMobile/AdminMobile";
import api from "../utils/Api";
import { vandalAuth } from "../utils/Auth";

function AppMobile() {
  const navigate = useNavigate();
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  const [cardsSearch, setCardsSearch] = useState({});
  const [me, setMe] = useState({});
  useEffect(() => {
    api
      .getCardsUser()
      .then((data) => {
        setCardsSearch(data.data);

        if (cardsSearch) {
          setLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (localStorage.getItem("jwt")) {
      vandalAuth.getContent().then((data) => {
        if(data){
          if(data.data){
            if(data.data.login){
              setMe(data)
              if(location.pathname === "/signin" ){
                   navigate('/admin')
              }
            }
          }
        }
      });
    } else {
      if (location.pathname === "/admin") {
        navigate("/signin");
      }
    }
  }, [location.pathname, navigate]);

  return (
    <div className="AppMobile">
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/" element={<MainMobile cardsSearch={cardsSearch}/>} />
        <Route path="/signin" element={<SignInMobile />} />
        <Route path="/admin" element={<AdminMobile me={me} setCardsSearch={setCardsSearch} cardsSearch={cardsSearch}/>} />
      </Routes>
    </div>
  );
}

export default AppMobile;
