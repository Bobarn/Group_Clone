import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { thunkLogout } from "../../redux/session";
import OpenModalMenuItem from "./OpenModalMenuItem";
import LoginFormModal from "../LoginFormModal";
import SignupFormModal from "../SignupFormModal";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";

function ProfileButton() {
  const {clearCart} = useContext(CartContext)
  const dispatch = useDispatch();
  const navigate = useNavigate()
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
    clearCart()
    dispatch(thunkLogout());
    navigate("/")
    closeMenu();
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
              <span>{user.username}</span>
              <span></span>
            </div>
            <div className='pb-quad-two blocks'>
              <span onClick={() =>{ navigate('need to ask zee route'); closeMenu()}}>Your Orders</span>
              {/* <span>Reviews</span> */}
              <span onClick={() => {navigate('/favorites'); closeMenu();}}>Favorite Items</span>

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
