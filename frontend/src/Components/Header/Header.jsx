import React, { useEffect, useRef } from 'react';
import './Header.css';
import {useAuth} from '../../context/auth'
import OlxLogo from '../../assets/OlxLogo';
import Search from '../../assets/Search';
import Arrow from '../../assets/Arrow';
import SellButton from '../../assets/SellButton';
import SellButtonPlus from '../../assets/SellButtonPlus';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const {user, logout} = useAuth()
  const navigate = useNavigate()
  const headRef = useRef();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= 80) {
        headRef.current.classList.add('nav-dark');
      } else {
        headRef.current.classList.remove('nav-dark');
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return (
    <div className="headerParentDiv" ref={headRef}>
      <div className="headerChildDiv">
        <div className="brandName">
          <OlxLogo onClick={() => navigate('/')}/>
        </div>
        <div className="placeSearch">
          <Search></Search>
          <input type="text" placeholder="India" />
          <Arrow></Arrow>
        </div>
        <div className="productSearch">
          <div className="input">
            <input
              type="text"
              placeholder="Find Cars, Mobile Phones and more..."
            />
          </div>
          <div className="searchAction">
            <Search color="#ffffff"></Search>
          </div>
        </div>
        <div className="language">
          <span>ENGLISH</span>
          <Arrow></Arrow>
        </div>
        {user ? (
          <div className="loginPage">
            <div className="userDropdown">
              <span className="userName">{user.name}</span>
              <div className="dropdownContent">
                <a onClick={logout} className="logout">Logout</a>
              </div>
            </div>
          </div>
        ) : (
          <div className="loginPage">
            <Link to='/login' className='loginLink'>
              <span>Login</span>
            </Link>
            <hr className="divider" />
            <Link to='/signup' className='signupLink'>
              <span>Signup</span>
            </Link>
          </div>
        )}
        {user && (
          <>
            <div className="loginPage">
              <Link to='/my-ads' className='myAdsLink'>
                <span>My Ads</span>
              </Link>
            </div>
            <div className="sellMenu">
              <SellButton></SellButton>
              <div className="sellMenuContent">
                <SellButtonPlus></SellButtonPlus>
                <Link to='/create_post' className="sellLink">
                  <span>SELL</span>
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Header;