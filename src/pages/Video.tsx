import React, { useEffect, useRef } from 'react';

const App = () => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.play().catch(error => {
        console.error("Error reproduciendo el video:", error);
      });
    }
  }, []);

  return (
    <div>
      <h1>Detección de Video Challenge</h1>
      <img
        src="http://localhost:5000/video_feed"
        alt="Stream de Video YOLO"
        width="640"
        height="480"
      />
    </div>
  );
};

export default App;
