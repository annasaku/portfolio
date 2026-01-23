import React, { useRef, useEffect, useState } from 'react';
import './App.css';

function App() {
  const aboutRef = useRef(null);
  const navRef = useRef(null);
  const [navFixed, setNavFixed] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // Handle scroll to About section
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle nav bar fixed state
  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current || !navRef.current) return;
      const aboutTop = aboutRef.current.getBoundingClientRect().top;
      const navTop = navRef.current.getBoundingClientRect().top;
      // Show nav only when About section is in view
      setShowNav(aboutTop <= 0);
      // Fix nav when it reaches the top
      setNavFixed(navTop <= 0 && aboutTop <= 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-root">
      {/* Landing Page */}
      <section className="landing-section">
        <h1 className="landing-title">Hello</h1>
        <button className="view-work-btn" onClick={scrollToAbout}>
          View My Work
        </button>
      </section>

      {/* About Me Section */}
      <section className="about-section" ref={aboutRef}>
        {/* Nav Bar */}
        <nav
          ref={navRef}
          className={`about-nav${navFixed ? ' fixed' : ''}${showNav ? '' : ' hidden'}`}
        >
          <ul>
            <li><a href="#about">About</a></li>
            <li><a href="#projects">Projects</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <div className="about-content about" id="about">
          <h2>About Me</h2>
          <p>I'm Anna!!! Yay!</p>
        </div>
        <div className="about-content projects" id="projects">
          <h2>Projects</h2>
          <p>list projects here</p>
        </div>
        <div className="about-content contact" id="contact">
          <h2>Contact</h2>
          <p>my contact details</p>
        </div>
      </section>
    </div>
  );
}

export default App;
