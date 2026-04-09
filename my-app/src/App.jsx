import React, { useRef, useEffect, useState } from 'react';
import './App.css';
import { Cat } from './Cat.jsx';
import 'bootstrap/dist/css/bootstrap.min.css';
import Carousel from 'react-bootstrap/Carousel';

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
    console.log('clicked dti!!!!');
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
      <img src='assets/background.png' className='background'></img>
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


          <div className="furikake" id="furikake" ref={furikakeRef}>
            <div className="furikake-text">
              <div className="project-heading">Furikake</div>
              <p>
                Furikake is a browser extension that helps Japanese language learners read kanji by displaying furigana (phonetic readings) based on their JLPT level.
              </p>
              <p>
                Unlike other extensions, it omits furigana for kanji within the user's level to promote natural reading practice.
                <br></br>
              </p>
              <p1>JavaScript, HTML, and CSS <br></br> </p1>
              <p2>
                <a href="https://chromewebstore.google.com/detail/furikake/megnkfpahhjagnpkmcdfennbmcanpfmg" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'underline'}}>Link to Chrome Web Store<br></br></a>
              </p2>
              <p2>
                <a href="https://github.com/annasaku/Furikake" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'underline'}}>Link to Github</a>
              </p2>
            </div>
            <div className="carousel furikake-carousel">
              <Carousel data-bs-theme="dark">
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/furikake/furikake_1.png"
                    alt="Furikake Screenshot 1"
                    style={{ borderRadius: '10px' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/furikake/furikake_2.png"
                    alt="Furikake Screenshot 2"
                    style={{ borderRadius: '10px' }}
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/furikake/furikake_3.png"
                    alt="Furikake Screenshot 3"
                    style={{ borderRadius: '10px' }}
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>


          <div className="about-content funwattle" id="funwattle" ref={funwattleRef}>
            <div className="carousel funwattle-carousel">
              <Carousel interval={null}>
                <Carousel.Item>
                  <video className="d-block w-100" controls>
                    <source src="/public/assets/funwattle/1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
                <Carousel.Item>
                  <video className="d-block w-100" controls>
                    <source src="/public/assets/funwattle/3.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
                <Carousel.Item>
                  <video className="d-block w-100" controls>
                    <source src="/public/assets/funwattle/4.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="funwattle-text">
              <div className="project-heading">Funwattle</div>
              <p>
                In a recent group project I designed and built the Child Dashboard frontend for a speech therapy app. The mobile app aimed to use gamified features to make speech therapy more fun and accessible to children who require language and communication support.
              </p>
              <p3>Features:</p3>
              <ul>
                <p4>
                  Gamified elements such as blooming wattle flowers for completed exercises, and customizable mascots with clothing options users can unlock by completing exercises.
                  Australian native flora and fauna motif with bright colours to appeal to children.
                </p4>
              </ul>
              <p3>Optimisations:</p3>
              <ul>
                <p4>
                  <strong>Reusability:</strong> Designed various exercise templates to dynamically load question data based on exercise type, eliminating the need to create separate files for each exercise, improving code reusability.
                  <br></br>
                  <br></br>
                </p4>
                <p4>
                  <strong>Extensibility:</strong> The use of templates allows for easy addition of new exercises, as clients can simply update question and answer data in the backend without modifying the frontend code, making the system highly maintainable and scalable.
                </p4>
              </ul>
              <p1>React Native with Expo, Expo Router<br></br> </p1>
              <p1>Typescript and Fetch API <br></br> </p1>
            </div>
          </div>


          <div className="dti" id="dti" ref={DTIRef}>
            <div className="dti-text">
              <div className="project-heading">DTI Anna</div>
              <p>
                Dress to Impress Anna (DTI Anna) is a multiplayer online game where you competitively dress-up an avatar based on a theme, inspired by the Roblox game Dress to Impress (DTI). 
              </p>
              <p>
                This game was built as a gift for my friends so it is slightly personalised to them, but I believe there is fun everyone can have with it!
                <br></br>
              </p>
              <p1>HTML, CSS, JavaScript, Node.js, Socket.IO<br></br><br></br> </p1>
              <p2>
                <a href="https://github.com/annasaku/Dress-to-Impress-Anna" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'underline'}}>Link to Github</a>
              </p2>
            </div>
            <div className="carousel dti-carousel">
              <Carousel data-bs-theme="dark" interval={null} keyboard={false}>
                <Carousel.Item>
                  <video className="d-block w-100" controls>
                    <source src="/public/assets/dtianna/1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/dtianna/2.png"
                    alt="DTI Anna Screenshot 1"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/dtianna/3.png"
                    alt="DTI Anna Screenshot 2"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/dtianna/4.png"
                    alt="DTI Anna Screenshot 3"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
          </div>


          <div className="airbrb" id="airbrb" ref={airbrbRef}>
            <div className="carousel airbrb-carousel">
              <Carousel interval={null}>
                <Carousel.Item>
                  <video className="d-block w-100" controls>
                    <source src="/public/assets/airbrb/1.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
                <Carousel.Item>
                  <video className="d-block w-100" controls>
                    <source src="/public/assets/airbrb/2.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
                <Carousel.Item>
                  <video className="d-block w-100" controls>
                    <source src="/public/assets/airbrb/3.mov" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/airbrb/4.png"
                    alt="Airbrb Screenshot 1"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/airbrb/5.png"
                    alt="Airbrb Screenshot 2"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/airbrb/6.png"
                    alt="Airbrb Screenshot 3"
                  />
                </Carousel.Item>
                <Carousel.Item>
                  <img
                    className="d-block w-100"
                    src="/public/assets/airbrb/7.png"
                    alt="Airbrb Screenshot 4"
                  />
                </Carousel.Item>
              </Carousel>
            </div>
            <div className="airbrb-text">
              <div className="project-heading airbrb-heading">Airbrb</div>
              <p>
                Airbrb is an accommodation booking website inspired by Airbnb, where users can search accommodations, book stays, post listings, manage listings and write reviews. The frontend was built as part of a UNSW assignment.
              </p>
              <p3>Optimisations:</p3>
              <ul>
                <li>
                  <strong>Reusability:</strong> Developed reusable components for listings, reviews, and booking forms, to improve maintainability.
                </li>
                <li>
                  <strong>Dynamic Rendering:</strong> Implemented dynamic rendering for listing cards and search results, allowing the UI to update in real-time based on user input and filters.
                </li>
                <li>
                  <strong>Accessibility:</strong> Followed WCAG guidelines to ensure frontend is accessible, including proper ARIA roles and keyboard navigation support.
                </li>
                <li>
                  <strong>Scalability:</strong> Designed the frontend to be modular and scalable, making it easy to add new features like additional filters or listing categories without major refactoring.
                </li>
              </ul>
              <p1>Vite + React, React Router, Axios, React Bootstrap, ESLint </p1>
              <br></br>
              <br></br>
              <p2>
                <a href="https://github.com/annasaku/airbrb-deploy" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(255, 255, 255, 0.7)', textDecoration: 'underline'}}>Link to Github</a>
              </p2>
            </div>
          </div>


          <div className="contact" id="contact" ref={contactRef}>
           <div className="contact-text">
             <div className="project-heading contact-heading">Contact me</div>
              <p1>Anna Sakurai Dahlstrom</p1>
              <br></br>
              <br></br>
              <p><strong>Email:</strong> annadahlstrom@outlook.com</p>
              <p><strong>LinkedIn:</strong> https://www.linkedin.com/in/anna-sakurai-dahlstrom-52136219b/</p>
              <p1>Please send an email for any enquiries.</p1>
              <br></br>
              <br></br>
              <p5>I hope you enjoyed the journey of our cat friend!</p5>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
