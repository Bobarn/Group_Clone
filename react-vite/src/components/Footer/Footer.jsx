import "./Footer.css";

function Footer() {
  return (
    <div className="footer-main-cont">
      <span className="foot-abt">About me</span>
      <div id="github-cont">
        <div className="foot-link-cont">
          <span className="foot-person">Itsy Bitsy</span>
          <a
            href="https://github.com/Bobarn/Itsy_Bitsy"
            target="_blank"
            rel="noopener noreferrer"
          >
            <i className="fa-brands fa-github"></i>
          </a>
        </div>
        <div className="foot-link-cont">
          <span className="foot-person">Brandon&apos;s</span>
          <div className="foot-a-cont">
            <a
              href="https://github.com/Bobarn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/brandon-tamayo-bobarn7/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="foot-link-cont">
          <span className="foot-person">Kyrene&apos;s</span>
          <div className="foot-a-cont">
            <a
              href="https://github.com/KyreneAF"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/kyrene-flores-5870432a8/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="foot-link-cont">
          <span className="foot-person">Light&apos;s</span>
          <div className="foot-a-cont">
            <a
              href="https://github.com/Ynnusexp"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/light-vo-626a752b5/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>

        <div className="foot-link-cont">
          <span className="foot-person">Muhammad&apos;s</span>
          <div className="foot-a-cont">
            <a
              href="https://github.com/mzubair4193"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-github"></i>
            </a>
            <a
              href="https://www.linkedin.com/in/muhammad-zubair-60024927a/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <i className="fa-brands fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
