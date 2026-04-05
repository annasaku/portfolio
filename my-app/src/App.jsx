import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Cat } from './Cat.jsx';

function App() {
  const homeRef = useRef(null);
  const furikakeRef = useRef(null);
  const funwattleRef = useRef(null);
  const DTIRef = useRef(null);
  const airbrbRef = useRef(null);
  const contactRef = useRef(null);
  const navRef = useRef(null);
  const [navFixed, setNavFixed] = useState(false);
  const [showNav, setShowNav] = useState(false);
  const [currentSection, setCurrentSection] = useState('home');

  useEffect(() => {
    const sections = [
      { id: 'home', ref: homeRef },
      { id: 'furikake', ref: furikakeRef },
      { id: 'funwattle', ref: funwattleRef },
      { id: 'dti', ref: DTIRef },
      { id: 'airbrb', ref: airbrbRef },
      { id: 'contact', ref: contactRef },
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setCurrentSection(entry.target.id);
          }
        });
      },
      { threshold: 0.5 }
    );

    sections.forEach((section) => {
      if (section.ref.current) {
        observer.observe(section.ref.current);
      }
    });

    return () => {
      sections.forEach((section) => {
        if (section.ref.current) {
          observer.unobserve(section.ref.current);
        }
      });
    };

  }, []);

  const scrollToHome = () => {
    homeRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToFurikake = () => {
    furikakeRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToFunwattle = () => {
    funwattleRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToDTI = () => {
    DTIRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToAirbrb = () => {
    airbrbRef.current.scrollIntoView({ behavior: 'smooth' });
  };
  const scrollToContact = () => {
    contactRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle nav bar fixed state
  useEffect(() => {
    const handleScroll = () => {
      if (!furikakeRef.current || !navRef.current) return;
      const aboutTop = furikakeRef.current.getBoundingClientRect().top;
      const navTop = navRef.current.getBoundingClientRect().top;
      // Show nav only when About section is in view
      setShowNav(aboutTop <= 0);
      // Fix nav when it reaches the top
      setNavFixed(navTop <= 0 && aboutTop <= 0);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
  const addRainEffect = () => {
    const furikakeSection = document.querySelector('.furikake');
    if (!furikakeSection) return;

    const numberOfDrops = 200;
    for (let i = 0; i < numberOfDrops; i++) {
      const raindrop = document.createElement('div');
      raindrop.classList.add('raindrop');
      raindrop.style.left = `${Math.random() * 100}%`;
      raindrop.style.animationDelay = `${Math.random()}s`;
      raindrop.style.animationDuration = `${0.5 + Math.random()}s`;
      furikakeSection.appendChild(raindrop);
    }
  };

  addRainEffect();
}, []);

  return (
    <div className="app-root">
      <img src='assets/background2.png' className='background'></img>
      <img src='assets/tumbleweed.png' className='tumbleweed'></img>
      <Cat currentSection={currentSection} />
      <div className='foreground'>
        <section className="landing-section" ref={homeRef} id='home'>
          <h1 className="landing-title">Hi, I'm Anna !</h1>
          <h2 className='landing-text'>I'm a UNSW Computer Science student, with<br></br> a passion for creating 
            meaningful and memorable projects.
          </h2>
          <div className='view-btn-container'>
            <div className="view-btn" onClick={scrollToFurikake}>
              VIEW MY WORK
            </div>
          </div>
        </section>

        <section className="about-section">
          <nav
            ref={navRef}
            className={`about-nav${navFixed ? ' fixed' : ''}${showNav ? '' : ' hidden'}`}
          >
            <ul>
              <li onClick={scrollToHome}>Home</li>
              <li onClick={scrollToFurikake}>Furikake</li>
              <li onClick={scrollToFunwattle}>Funwattle</li>
              <li onClick={scrollToDTI}>Dress to Impress</li>
              <li onClick={scrollToAirbrb}>Airbrb</li>
              <li onClick={scrollToContact}>Contact</li>
            </ul>
          </nav>
          <div className="about-content furikake" id="furikake" ref={furikakeRef}>
            <div className="project furikake-text">
              <h2>Furikake</h2>
              <p>I'm Anna!!! Yay!</p>
            </div>
          </div>
          <div className="about-content funwattle" id="funwattle" ref={funwattleRef}>
            <div className="project funwattle-text">
              <h2>Funwattle</h2>
              <p>list projects here</p>
            </div>
          </div>
          <div className="about-content dti" id="dti" ref={DTIRef}>
            <div className="project dti-text">
              <h2>Dress To Impress Anna</h2>
              <p>list projects here</p>
            </div>
          </div>
          <div className="about-content airbrb" id="airbrb" ref={airbrbRef}>
            <div className="project airbrb-text">
              <h2>Airbrb</h2>
              <p>list projects here</p>
            </div>
          </div>
          <div className="about-content contact" id="contact" ref={contactRef}>
            <div className="project contact-text">
              <h2>Contact</h2>
              <p>my contact details</p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
