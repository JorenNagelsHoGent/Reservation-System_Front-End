import logo from "../img/vco_blue_c.png";
import "./css/footer.css";

import SocialLink from "./socialLink.js";

function Footer() {
  return (
    <div className="Footer">
      <img id="logo" alt="" src={logo} />
      <Socials />
    </div>
  );
}

function Socials() {
  return (
    <div className="SocialsFooter">
      Volg ons op social media
      <br />
      <br />
      <a href="https://vcoudegem.be" target="_blank" rel="noopener noreferrer">
        <i className="fas fa-globe"></i>
      </a>
      <SocialLink platform="instagram" />
      <SocialLink platform="facebook" />
    </div>
  );
}

export default Footer;
