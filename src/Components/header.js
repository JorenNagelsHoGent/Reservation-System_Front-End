import logo from "../img/vco_blue_c-white.png";
import "./css/header.css";

import SocialLink from "./socialLink.js";

function Header() {
  return (
    <div className="Header">
      <a href="https://vcoudegem.be" id="logoRapper">
        <img id="logo" alt="" src={logo} />
      </a>
      <div className="whitespace"></div>
      <Title title="Reservatie Mosselfestijn" />
      <div className="whitespace"></div>
      <Socials />
    </div>
  );
}

function Title(props) {
  return <div className="Title">{props.title}</div>;
}
function Socials() {
  return (
    <div className="SocialsHeader">
      <SocialLink platform="instagram" />
      <SocialLink platform="facebook" />
    </div>
  );
}

export default Header;
