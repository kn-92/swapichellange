import "./Card.css";

import { useAppSelector } from "../../../redux/hooks";

const Card = () => {
  const state = useAppSelector((state) => state);

  let index = 0;
  let number = state.people.number;

  if (number === 1) {
    index = 0;
  } else {
    index = number -= 1;
  }
  if (state.people.data.length === index) {
    index = number -= 1;
  }
  const personData = state.people.data[index];

  return (
    <div className="Card">
      <div className="cardDetails">
        <img
          className="picture"
          src="https://i.picsum.photos/id/289/534/383.jpg?hmac=1OLENOPslvzZsWhYoYWaoM-_79AHY_VpC-FH1KZprnE"
          alt="character_photo"
        />
        <div className="name">
          {personData?.name}
          <div className="icons">
            <i className="fa-solid fa-user iconuser"></i>
            <i className="fa-solid fa-circle-check iconcheck"></i>
          </div>
        </div>

        <div className="data">
          <div>birth-year: {personData?.birth_year}</div>
          <div>eye color: {personData?.eye_color}</div>
        </div>
      </div>
    </div>
  );
};

export default Card;
