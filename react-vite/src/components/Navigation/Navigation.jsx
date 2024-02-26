import {useState} from "react"
import { useNavigate } from "react-router-dom";
import ProfileButton from "./ProfileButton";
import CategoriesMenu from "./CategoriesMenu";
import "./Navigation.css";

function Navigation() {
  // const logoImg = 'https://cdn.discordapp.com/attachments/1196941900939280534/1199775281427259453/logo-color.png?ex=65c3c4cd&is=65b14fcd&hm=10ffed8b450e1dea968323412876fe440315bd9f87d5d771df14efd2cde949e2&'
  const navigate = useNavigate();
  const logoImg ="https://cdn.discordapp.com/attachments/1187515837817557065/1210377534907228240/portfolio1.png?ex=65ea56ec&is=65d7e1ec&hm=08f7d6e2580a81c22c1a81ae51ffb4e44b27555d41565e1f136d6f41799ddbde&";
  const [value,setValue] = useState()
  return (
    <div className="nav-main-cont" >
      <div className="logo-main-cont">
        <img src={logoImg} alt="Saved Image" className="logo-img" onClick={() => navigate("/")} />
      </div>
      <div className='nav-cat-comp-cont'>
      <CategoriesMenu />
      </div>
      <div className='nav-search-main-cont'>
      <input
        onClick={() => window.alert('Feature coming soon...')}
        className='search-bar'
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Search..."
      />


      </div>

      <div>
        <ProfileButton />
      </div>
    </div>
  );
}

export default Navigation;
