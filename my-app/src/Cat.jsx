import { useEffect, useRef, useState, useMemo } from 'react';
import './Cat.css';

function useCat() {
  const [animation, setAnimation] = useState("idle");
  const [frame, setFrame] = useState(0);
  const [hasMovedMouse, setHasMovedMouse] = useState(false);
  // Place cat in bottom right corner on first load
  const [position, setPosition] = useState(() => {
    const catWidth = 300;
    const catHeight = 300;
    const padding = 20;
    const x = typeof window !== 'undefined' ? window.innerWidth - catWidth - padding : 200;
    const y = typeof window !== 'undefined' ? window.innerHeight - catHeight - padding : 200;
    return { x, y };
  });

  // Animation frames: 8 for idle, 4 for each movement
  const animations = useMemo(() => ({
    idle: [
      "/assets/idle/idle_1.png",
      "/assets/idle/idle_2.png",
      "/assets/idle/idle_3.png",
      "/assets/idle/idle_4.png",
      "/assets/idle/idle_5.png",
      "/assets/idle/idle_6.png",
      "/assets/idle/idle_7.png",
      "/assets/idle/idle_8.png",
    ],
    moveUp: [
      "/assets/up/up_1.png",
      "/assets/up/up_2.png",
      "/assets/up/up_3.png",
      "/assets/up/up_4.png",
    ],
    moveDown: [
      "/assets/down/down_1.png",
      "/assets/down/down_2.png",
      "/assets/down/down_3.png",
      "/assets/down/down_4.png",
    ],
    moveLeft: [
      "/assets/left/left_1.png",
      "/assets/left/left_2.png",
      "/assets/left/left_3.png",
      "/assets/left/left_4.png",
    ],
    moveRight: [
      "/assets/right/right_1.png",
      "/assets/right/right_2.png",
      "/assets/right/right_3.png",
      "/assets/right/right_4.png",
    ]
  }), []);

  // mouse tracking
  const mouse = useRef({ x: 0, y: 0 });
  const lastMouseMove = useRef(0);

  useEffect(() => {
    const handleMove = (e) => {
      mouse.current = { x: e.pageX, y: e.pageY };
      lastMouseMove.current = Date.now();
      if (!hasMovedMouse) setHasMovedMouse(true);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [hasMovedMouse]);

  // useEffect(() => {
  //   lastMouseMove.current = Date.now();
  // }, []);

  // useEffect(() => {
  //   const handleMove = (e) => {
  //     mouse.current = { x: e.clientX, y: e.clientY };
  //     lastMouseMove.current = Date.now();
  //   };
  //   window.addEventListener("mousemove", handleMove);
  //   return () => window.removeEventListener("mousemove", handleMove);
  // }, []);

  // movement
  const catPos = useRef(position);
  const speed = 4;

  function getDirection(dx, dy) {
    const angle = Math.atan2(dy, dx);

    if (angle >= -Math.PI / 4 && angle < Math.PI / 4) return "Right";
    if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) return "Down";
    if (angle < -Math.PI / 4 && angle >= (-3 * Math.PI) / 4) return "Up";
    return "Left";
  }

  useEffect(() => {
    let animationId;

    function update() {
      if (!hasMovedMouse) {
        setAnimation("idle");
        animationId = requestAnimationFrame(update);
        return;
      }
      const { x: mx, y: my } = mouse.current;
      const { x, y } = catPos.current;
      const dx = mx - x;
      const dy = my - y;
      const dist = Math.hypot(dx, dy);

      // Only go idle when cat is near mouse (direction-specific thresholds)
      const dir = getDirection(dx, dy);
      let moving = false;
      if (dir === "Right") {
        moving = dx > 200;
      } else if (dir === "Left") {
        moving = dx < -30;
      } else if (dir === "Up") {
        moving = dy < -30;
      } else if (dir === "Down") {
        moving = dy > 240;
      }

      if (moving) {
        console.log("now moving!");
        console.log("distance is ", dist);
        catPos.current.x += (dx / dist) * speed;
        catPos.current.y += (dy / dist) * speed;
        setAnimation(`move${dir}`);
      } else {
        console.log("now idle!");
        setAnimation("idle");
      }
      // Update state so React re-renders
      setPosition({ x: catPos.current.x, y: catPos.current.y });
      animationId = requestAnimationFrame(update);
    }
    animationId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(animationId);
  }, [hasMovedMouse]);

  // frame stepping
  useEffect(() => {
    let delay = 220;
    if (animation !== "idle") {
      delay = 110; // animation is faster for movement
    }
    const interval = setInterval(() => {
      setFrame((f) => (f + 1) % animations[animation].length);
    }, delay);
    return () => clearInterval(interval);
  }, [animation, animations]);

  // Return animations for Cat component to use
  return { position, animation, frame, animations };
}

export function Cat() {
  const cat = useCat();
  // Use cat.animations for correct frame
  return (
    <div className="cat-container">
      <img
        src={cat.animations[cat.animation][cat.frame]}
        style={{ 
          left: cat.position.x, 
          top: cat.position.y, 
          position: 'absolute',
          zIndex: 1000
        }}
        className="cat"
        alt="cat sprite"
      />

    </div>
  );
}