import "./FormLink.css";

import { Link } from "react-router-dom";

const FormLink = () => {
  return (
    <>
      <Link to="/register">
        <button className="FormButton">formularz rejestracyjny</button>
      </Link>
    </>
  );
};

export default FormLink;
