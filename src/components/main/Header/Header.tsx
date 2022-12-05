import "./Header.css";

import Name from "./Name/Name";
import FormLink from "./FormLink/FormLink";

const Header = () => {
  return (
    <div className="Header">
      <Name />
      <FormLink />
    </div>
  );
};

export default Header;
