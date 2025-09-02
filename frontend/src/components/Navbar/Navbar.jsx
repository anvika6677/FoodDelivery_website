// import React, { useContext, useState } from 'react'
// import './Navbar.css'
// import { Link, useNavigate } from 'react-router-dom';
// import { StoreContext } from '../../Context/StoreContext';
// import { assets } from '../../assets/assets';




// const Navbar = ({setShowLogin}) => {

//     const [menu,setMenu] = useState("menu");

//     const {getTotalCartAmount,token,setToken} = useContext(StoreContext);

//     const navigate = useNavigate();

//     const logout = () => {
//       localStorage.removeItem("token");
//       setToken("");
//       navigate("/");

//     }

//   return (
//     <div className='navbar'>
//       <Link to='/'><img src = {assets.logo} alt="" className='logo' /></Link>
//       <ul className="navbar-menu">
//         <Link to='/' onClick={()=>setMenu("home")} className={menu==="home"?"active": ""}>home</Link>
//         <a href='#explore-menu' onClick={()=>setMenu("menu")} className={menu==="menu"?"active": ""}>menu</a>
//         <a href='#app-download' onClick={()=>setMenu("mobile-app")} className={menu==="mobile-app"?"active": ""}>mobile-app</a>
//         <a href='#footer' onClick={()=>setMenu("contact-us")} className={menu==="contact-us"?"active":""}>contact-us</a>
//         </ul>
//         <div className="navbar-right">
//             <img src={assets.search_icon} alt="" />
//             <div className="navbar-search-icon">
//                 <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
//                 <div className={getTotalCartAmount()===0?"":"dot"}></div>
//             </div> 
//             {!token?<button onClick={()=>setShowLogin(true)}>sign in</button>
//             :<div className='navbar-profile'>
//               <img src={assets.profile_icon} alt="" />
//               <ul className="nav-profile-dropdown">
//                 <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
//                 <hr />
//                 <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
//               </ul>
//               </div>}
//         </div>
//     </div>
//   )
// }

// export default Navbar; 
import React, { useContext, useState, useEffect } from 'react';
import './Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../Context/StoreContext';
import { assets } from '../../assets/assets';
import axios from 'axios';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  
  const { getTotalCartAmount, token, setToken } = useContext(StoreContext);
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  useEffect(() => {
    if (searchTerm.trim() !== "") {
      const fetchImages = async () => {
        try {
          const response = await axios.get(`https://api.unsplash.com/search/photos`, {
            params: {
              query: searchTerm,
              client_id: 'G9AefR9AXrxMlg4jdQEPVZa_T0b6Kgx9BpFwzi_U3Mk', // replace with your Unsplash API key
              per_page: 5, // Number of images to fetch
            },
          });
          setImages(response.data.results);
        } catch (error) {
          console.error('Error fetching images:', error);
        }
      };
      fetchImages();
    } else {
      setImages([]);
    }
  }, [searchTerm]);

  return (
    <div className='navbar'>
      <Link to='/'><img src={assets.logo} alt="" className='logo' /></Link>
      <ul className="navbar-menu">
        <Link to='/' onClick={() => setMenu("home")} className={menu === "home" ? "active" : ""}>home</Link>
        <a href='#explore-menu' onClick={() => setMenu("menu")} className={menu === "menu" ? "active" : ""}>menu</a>
        <a href='#app-download' onClick={() => setMenu("mobile-app")} className={menu === "mobile-app" ? "active" : ""}>mobile-app</a>
        <a href='#footer' onClick={() => setMenu("contact-us")} className={menu === "contact-us" ? "active" : ""}>contact-us</a>
      </ul>

      <div className="navbar-right">
        <div className="navbar-search">
          <input
            type="text"
            placeholder="Search images"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="navbar-search-results">
            {images.length > 0 && searchTerm.trim() !== "" && (
              <div className="image-results">
                {images.map((image) => (
                  <img key={image.id} src={image.urls.small} alt={image.alt_description} className="search-result-image" />
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="navbar-search-icon">
          <Link to='/cart'><img src={assets.basket_icon} alt="" /></Link>
          <div className={getTotalCartAmount() === 0 ? "" : "dot"}></div>
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)}>sign in</button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt="" />
            <ul className="nav-profile-dropdown">
              <li><img src={assets.bag_icon} alt="" /><p>Orders</p></li>
              <hr />
              <li onClick={logout}><img src={assets.logout_icon} alt="" /><p>Logout</p></li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
