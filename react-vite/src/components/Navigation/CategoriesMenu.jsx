import { useState, useEffect, useRef } from "react";
// import OpenModalMenuItem from "./OpenModalMenuItem";
import { useNavigate } from "react-router-dom";

function CategoriesMenu() {
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
  const ulRef = useRef();


  const toggleMenu = (e) => {
    e.stopPropagation(); // Keep from bubbling up to document and triggering closeMenu
    setShowMenu(!showMenu);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = (e) => {
      if (ulRef.current && !ulRef.current.contains(e.target)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);
  const closeMenu = () => setShowMenu(false);

  const handleOnClick = (category) => {

    navigate(`/category/${category}`);
    closeMenu();
  };

  return (
    <div className="nav-cat-comp-main-cont">
      <div className="nav-cat-main-cont" onClick={toggleMenu}>
        {/* <div className='cat-icon-cont'> */}
        <i className="fa-solid fa-bars"></i>

        {/* </div> */}
        <span className="cat-menu-drop" >Categories</span>
      </div>
      {showMenu && (
        <div className={"cat-dropdown"} ref={ulRef}>
          <div
            className="nav-cat-text-cont"
            onClick={() => handleOnClick("Jewelry")}
          >
            <span>Jewelry</span>
          </div>
          <div
            className="nav-cat-text-cont"
            onClick={() => handleOnClick("Clothes")}
          >
            <span>Clothing</span>
          </div>
          <div
            className="nav-cat-text-cont"
            onClick={() => handleOnClick("Art")}
          >
            <span>Art</span>
          </div>
          <div
            className="nav-cat-text-cont"
            onClick={() => handleOnClick("Art Supplies")}
          >
            <span>Art Supplies</span>
          </div>
          <div
            className="nav-cat-text-cont"
            onClick={() => handleOnClick("Electronics")}
          >
            <span>Electronics</span>
          </div>
          <div
            className="nav-cat-text-cont"
            onClick={() => handleOnClick("Pet Supplies")}
          >
            <span>Pet Supplies</span>
          </div>
        </div>
      )}
    </div>
  );
}

export default CategoriesMenu;
