import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import './ProfileButton.css'
import { clearState } from "../../redux/favorited_items";

function ProfileButton() {
  const { clearCart } = useContext(CartContext);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const user = useSelector((store) => store.session.user);
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

  const logout = (e) => {
    e.preventDefault();
    dispatch(thunkLogout())
    .then(() => dispatch(clearState()))
    .then(() => clearCart())
    .then(() => navigate("/"))
    .then(() => closeMenu());
  };

  // const handleOnClock = (param) =>{
  //   navigate
  // }
  return (
    <div className="profile-bttn-main-cont">
      <button onClick={toggleMenu}>
        <i className="fas fa-user-circle" />
      </button>
      {showMenu && (
        <ul className={"profile-dropdown"} ref={ulRef}>
          {user ? (
            <>
            <div className='pb-quad-one blocks'>
              <span>{`Hello, ${user.username}!`}</span>
              <span></span>
              <br />
              <span onClick={() =>{ navigate('/orders'); closeMenu()}}>Your Orders</span>
              {/* <span>Reviews</span> */}
              <br />
              <span onClick={() => {navigate('/favorites'); closeMenu();}}>Favorite Items</span>
              <br />
              <span onClick={(() =>{navigate('/store')})}>Your Store</span>

            </div>
            <div>
              <div className='pb-quad-three blocks'>
                <button onClick={logout}>Log Out</button>
              </div>

            </div>
            </>
          ) : (
            <>
              <OpenModalMenuItem
                itemText="Log In"
                onItemClick={closeMenu}
                modalComponent={<LoginFormModal />}
              />
              <OpenModalMenuItem
                itemText="Sign Up"
                onItemClick={closeMenu}
                modalComponent={<SignupFormModal />}
              />
            </>
          )}
        </ul>
      )}
    </div>
  );
}

export default ProfileButton;
