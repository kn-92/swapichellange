import React, { useEffect } from "react";
import "./App.css";

import { getPerson } from "./redux/peopleSlice";
import { useAppDispatch } from "./redux/hooks";
import { Routes, Route } from "react-router-dom";

import Main from "./components/main/Main";
import RegisterFormWrapper from "./components/RegisterForm/RegisterFormWrapper";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getPerson());
  }, [dispatch]);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/register" element={<RegisterFormWrapper />} />
      </Routes>
    </div>
  );
}

export default App;
