import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import "./App.css";
import Loading from "./Loading/Loading";
import Main from "./Main/Main";
import SignIn from "./SignIn/SignIn";
import Admin from "./Admin/Admin";
import api from "../utils/Api";
import { vandalAuth } from "../utils/Auth";


function App() {
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
     if(localStorage.getItem("jwt")) {
        vandalAuth.getContent().then(data => {
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
        })
     } else {
      if(location.pathname === "/admin" ){
        navigate('/signin')
   }
     }
  }, [location.pathname, navigate]);




  return (
    <div className="App">
      {loading ? <Loading /> : null}
      <Routes>
        <Route path="/" element={<Main cardsSearch={cardsSearch}/>} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/admin" element={<Admin me={me} setCardsSearch={setCardsSearch} cardsSearch={cardsSearch}/>} />
      </Routes>
    </div>
  );
}

export default App;
