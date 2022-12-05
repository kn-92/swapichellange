import "./Main.css";

import Header from "./Header/Header";
import Card from "./Card/Card";

import { numberIncrement } from "../../redux/peopleSlice";
import { getPerson } from "../../redux/peopleSlice";
import { useAppDispatch } from "../../redux/hooks";

const Main = () => {
  const dispatch = useAppDispatch();
  const handleClick = () => {
    dispatch(numberIncrement());
    dispatch(getPerson());
  };

  return (
    <div className="Main">
      <Header />
      <Card />
      <button className="button" onClick={handleClick}>
        next profiles
      </button>
    </div>
  );
};

export default Main;
