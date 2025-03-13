import '../assets/HomePage.css';
import React, { useState } from 'react';
import expenditureImage from '../assets/event.jpg'
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = useNavigate();

  const toggleMenu = () =>{
    setMenuOpen(!menuOpen);
};
const handleSignupClick= ()=>{
    nav("/signup")
}

  return (
    <div className='wrapper'>
    <header>
        <nav>
               <p><span>Yene</span>Bazaar</p>
               <div className="menu-icon" onClick={toggleMenu}>
                   <i className="bi bi-list"></i> 
               </div>
                <ul className={`nav-list ${menuOpen ? 'open' : ''}`}>
                    <li className='nav-item ni' id="home" >Home</li>
                    <li className='nav-item ni' id="signup" onClick={handleSignupClick}>
                        <i class="bi bi-person-fill" ></i>SignUp/Login</li>
                    <li className='nav-item'>
                        <a href="#about">About</a>
                        
                    </li>
                     <li className='nav-item'>
                        <a href="#services">Our Service</a>
                    </li>
                    <li className='nav-item'>
                        <a href="#testimonials">Feedback</a>
                    </li>
                    <li className='nav-item'>
                        <a href="#contact">Contact Us</a>
                    </li>
                   
                </ul>
          
        </nav>
    </header>
    {/* {signUp && <Signup />} */}
    {/* {signUp && <Signup closeSignUp={handleCloseSignUp}/>} */}
    <div className='home-img'>
    <img src={expenditureImage} alt="Expenditure" />

    </div>
    <div id="about" className="about">
           <h2>About</h2>
           <p>      Yene Bazaar is your one-stop solution for all event management needs. 
           From weddings to corporate events, we specialize in creating unforgettable experiences.</p>
    </div>

{/* Services Section */}
<div className="services" id="services">
                    <h1>Our Services</h1>
                    <div className="service-cards">
                        <div className="service-card">
                            <h3>Wedding Planning</h3>
                            <p>Creating magical moments for your special day.</p>
                        </div>
                        <div className="service-card">
                            <h3>Corporate Events</h3>
                            <p>Professional events tailored to your needs.</p>
                        </div>
                        <div className="service-card">
                            <h3>Birthday Parties</h3>
                            <p>Make your birthdays truly memorable.</p>
                        </div>
                    </div>
                </div>
 {/* Testimonials Section */}
 <div className="testimonials" id="testimonials">
                    <h1>What Our Clients Say</h1>
                    <div className="testimonial-cards">
                        <div className="testimonial-card">
                            <p>"Yene Bazaar turned our dream wedding into a reality. Highly recommend!"</p>
                            <span>- Sarah T.</span>
                        </div>
                        <div className="testimonial-card">
                            <p>"Their team made our corporate event seamless and professional."</p>
                            <span>- John D.</span>
                        </div>
                    </div>
                </div>



    <div id="contact" className="contact">
           <h2>Contact Us</h2>
           <div className="social-media">
                <div className="facebook"><a href=""><i class="bi bi-facebook"></i></a></div>
                <div className="Email"><a href=""><i class="bi bi-envelope-fill"></i></a></div>
                <div className="Instagram"><a href=""><i class="bi bi-instagram"></i></a></div>
           </div>
    </div>
                  
    <footer>
<p>&copy;All right reserved</p>
    </footer>
    
  </div>
  );
}

export default HomePage;