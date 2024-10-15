import React from 'react';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux'
import {
    FaSquareXTwitter,
    FaSquareInstagram,
    FaYoutube,
    FaLinkedin,
  } from "react-icons/fa6";

const Footer = () => {
    const {isAuthenticated}=useSelector((state) => state.user)
    return (
        <>
           <footer>
            <div>
                <img src="/logo1.png" alt="logo" className='logoImg'  />
            </div>
            <div>
                <h4>Support</h4>
                <ul>
                    <li>3B2 Mohali, Chandigarh</li>
                    <li>choudharyanchal2000@gmail.com</li>
                    <li>+917559680268</li>
                  
                </ul>
            </div>
            <div>
                <h4>Ouick Links</h4>
                <li><Link to={"/"}>Home</Link></li>
                <li><Link to={"/jobs"}>Job</Link></li>
                {isAuthenticated && <li><Link to={"/dashboard"}>Dashboard</Link></li>}
            </div>
            <div>
                <h4>Follow Us</h4>
                <ul>
                   <li><Link><span><FaSquareXTwitter/></span>Twitter(X)<span></span></Link></li> 
                   <li><Link><span><FaSquareInstagram/></span><span>Instagram</span></Link></li> 
                   <li><Link><span><FaYoutube/></span><span>Youtube</span></Link></li> 
                   <li><Link><span><FaLinkedin/></span><span>Linkdin</span></Link></li> 
                </ul>
            </div>
        </footer>  
        <div className="copyright">
            &copy; CopyRight 2024. All Rights Reserved By Anchal Choudhary
        </div>
        </>
    );
}

export default Footer;
