import { useEffect, useRef, useState, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import './Cat.css';

gsap.registerPlugin(useGSAP);

function useCat(currentSection) {
  const [animation, setAnimation] = useState("idle");
  const [frame, setFrame] = useState(0);
  const [hasMovedMouse, setHasMovedMouse] = useState(false);

  const catRef = useRef(null); // ref to the DOM img element

  const [position] = useState(() => {
    const catWidth = 350;
    const catHeight = 350;
    const padding = 100;
    const x = typeof window !== 'undefined' ? window.innerWidth - catWidth - padding : 200;
    const y = typeof window !== 'undefined' ? window.innerHeight - catHeight - padding : 200;
    return { x, y };
  });

  const animations = useMemo(() => {
    const folderMap = {
      home: 'dirty',
      furikake: 'wet',
      funwattle: 'leaf',
      dti: 'fish',
      airbrb: 'flower',
      contact: 'pet',
    };
    const folder = folderMap[currentSection] ?? 'dirty';

    return {
      idle: Array.from({ length: 8 }, (_, i) => `/assets/${folder}/idle/idle_${i + 1}.png`),
      moveUp: Array.from({ length: 4 }, (_, i) => `/assets/${folder}/up/up_${i + 1}.png`),
      moveDown: Array.from({ length: 4 }, (_, i) => `/assets/${folder}/down/down_${i + 1}.png`),
      moveLeft: Array.from({ length: 4 }, (_, i) => `/assets/${folder}/left/left_${i + 1}.png`),
      moveRight: Array.from({ length: 4 }, (_, i) => `/assets/${folder}/right/right_${i + 1}.png`),
    };
  }, [currentSection]);

  // Preload images whenever animations change
  useEffect(() => {
    Object.values(animations).forEach((frames) => {
      frames.forEach((src) => {
        const img = new Image();
        img.src = src;
      });
    });
  }, [animations]);

  // Mouse tracking
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current = { x: e.pageX, y: e.pageY };
      if (!hasMovedMouse) setHasMovedMouse(true);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hasMovedMouse]);

  const catPos = useRef({ ...position });
  const animationRef = useRef("idle");
  const hasMovedMouseRef = useRef(false);
  const animationsRef = useRef(animations);
  const speed = 6;

  useEffect(() => { hasMovedMouseRef.current = hasMovedMouse; }, [hasMovedMouse]);
  useEffect(() => { animationsRef.current = animations; }, [animations]);

  function getDirection(dx, dy) {
    const angle = Math.atan2(dy, dx);
    if (angle >= -Math.PI / 4 && angle < Math.PI / 4) return "Right";
    if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) return "Down";
    if (angle < -Math.PI / 4 && angle >= (-3 * Math.PI) / 4) return "Up";
    return "Left";
  }

  // GSAP ticker
  useGSAP(() => {
    // Sync GSAP's transform with the initial position
    if (catRef.current) {
      gsap.set(catRef.current, {
        x: catPos.current.x,
        y: catPos.current.y,
      });
    }

    const initialScrollHeight = document.documentElement.scrollHeight;

    const ticker = () => {
      if (!hasMovedMouseRef.current || !catRef.current) return;

      const { x: mx, y: my } = mouse.current;
      const { x, y } = catPos.current;
      const dx = mx - x;
      const dy = my - y;
      const dist = Math.hypot(dx, dy);

      const dir = getDirection(dx, dy);
      let moving = false;
      if (dir === "Right") moving = dx > 80;
      else if (dir === "Left") moving = dx < -80;
      else if (dir === "Down") moving = dy > 80;
      else if (dir === "Up") moving = dy < -80;

      const nextAnim = moving ? `move${dir}` : "idle";

      if (moving) {
        catPos.current.x += (dx / dist) * speed;
        catPos.current.y += (dy / dist) * speed;

        // Clamp the cat's movement to the initial scroll height
        catPos.current.y = Math.min(Math.max(catPos.current.y, 0), initialScrollHeight - 350);

        // GSAP directly mutates the DOM
        gsap.set(catRef.current, {
          x: catPos.current.x,
          y: catPos.current.y,
        });
      }

      if (nextAnim !== animationRef.current) {
        animationRef.current = nextAnim;
        setAnimation(nextAnim); // only triggers re-render on actual state change
      }
    };

    gsap.ticker.add(ticker);
    return () => gsap.ticker.remove(ticker);
  }, []);

  // Frame stepping
  useEffect(() => {
    const delay = animation === "idle" ? 0.25 : 0.16;
    let frameIndex = 0;

    let call;
    const step = () => {
      frameIndex = (frameIndex + 1) % animationsRef.current[animation].length;
      setFrame(frameIndex);
      call = gsap.delayedCall(delay, step);
    };
    call = gsap.delayedCall(delay, step);

    return () => call.kill();
  }, [animation]);

  return { catRef, position, animation, frame, animations };
}

export function Cat({ currentSection }) {
  const { catRef, position, animation, frame, animations } = useCat(currentSection);

  const handleImageError = (e) => {
    e.target.style.display = "none";
  };

  return (
    <div className="cat-container">
      <img
        ref={catRef}
        src={animations[animation][frame]}
        style={{
          left: 0,
          top: 0,
          position: 'absolute',
          zIndex: 100,
        }}
        className="cat"
        onError={handleImageError}
      />
    </div>
  );
}