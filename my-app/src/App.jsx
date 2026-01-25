import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Cat } from './Cat.jsx';

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null);
  const [navFixed, setNavFixed] = useState(false);
  const [showNav, setShowNav] = useState(false);

  const scrollToHome = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAbout = () => {
    aboutRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToProjects = () => {
    projectsRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
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
      <Cat/>
      <section className="landing-section" ref={homeRef}>
        <h1 className="landing-title">Hello</h1>
        <button className="view-work-btn" onClick={scrollToAbout}>
          View My Work
        </button>
      </section>

      <section className="about-section" ref={aboutRef}>
        <nav
          ref={navRef}
          className={`about-nav${navFixed ? ' fixed' : ''}${showNav ? '' : ' hidden'}`}
        >
          <ul>
            <li onClick={scrollToHome}>Home</li>
            <li onClick={scrollToAbout}>About</li>
            <li onClick={scrollToProjects}>Projects</li>
            <li onClick={scrollToContact}>Contact</li>
          </ul>
        </nav>
        <div className="about-content about" id="about" ref={aboutRef}>
          <h2>About Me</h2>
          <p>I'm Anna!!! Yay!</p>
        </div>
        <div className="about-content projects" id="projects" ref={projectsRef}>
          <h2>Projects</h2>
          <p>list projects here</p>
        </div>
        <div className="about-content contact" id="contact" ref={contactRef}>
          <h2>Contact</h2>
          <p>my contact details</p>
        </div>
      </section>
    </div>
  );
}

export default App;
