// import { NavLink } from "react-router-dom";
// import ProfileButton from "./ProfileButton";
// import "./Navigation.css";

// function Navigation() {
//   return (
//     <ul>
//       <li>

//         <NavLink to="/">Home</NavLink>
//       </li>

//       <li>
//         <ProfileButton />
//       </li>
//     </ul>
//   );
// }

// export default Navigation;
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CategoriesMenu from "./CategoriesMenu";
import "./Navigation.css";

function Navigation() {
  // const logoImg = 'https://cdn.discordapp.com/attachments/1196941900939280534/1199775281427259453/logo-color.png?ex=65c3c4cd&is=65b14fcd&hm=10ffed8b450e1dea968323412876fe440315bd9f87d5d771df14efd2cde949e2&'
  const navigate = useNavigate();
  const logoImg =
    "https://cdn.discordapp.com/attachments/1196941900939280534/1199775281888637070/logo-no-background.png?ex=65c3c4cd&is=65b14fcd&hm=f65bd9aa5eadabc00111d0f96b564b8d2d7d34addfcd9625464f9a85ac476dd2&";

  return (
    <div className="nav-main-cont" >
      <div className="logo-main-cont" onClick={() => navigate("/")}>
        <img src={logoImg} alt="Saved Image" className="logo-img" />
      </div>
      <CategoriesMenu />
      {/* <div className="nav-cat-main-cont">
        <i className="fa-solid fa-bars"></i>
        <span>Categories</span>
      </div> */}

      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
