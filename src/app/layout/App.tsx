import { FC, useEffect, useRef, useState } from "react";
import "../style/App.css";

const App: FC = () => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(100);
  const [playTime, setPlayTime] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (isPlaying && audioRef.current) {
        setPlayTime(audioRef.current.currentTime);
      }
    });

    return () => clearInterval(interval);
  });

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play();
      setIsPlaying(true);
      console.log(audioRef.current.volume);
    }
  };

  const handlePause = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  return (
    <div className="App">
      <div className="Track">
        <div className="Text">
          <h2 className="Title">Track Title Goes Here</h2>
          <p className="Author">Track Author</p>
        </div>
        <div className="Image"></div>
        <div className="Controls">
          <p style={{ color: "white" }}>{playTime}</p>
          <input
            className="Playtime"
            type="range"
            max={audioRef.current?.duration}
            min={0}
            step={1}
            value={playTime}
            onChange={(e) => (audioRef.current ? (audioRef.current.currentTime = parseInt(e.target.value)) : null)}
          />
          {isPlaying ? (
            <button onClick={handlePause} className="Button">
              <span className="material-symbols-outlined">pause_circle</span>
            </button>
          ) : (
            <button onClick={handlePlay} className="Button">
              <span className="material-symbols-outlined">play_circle</span>
            </button>
          )}
          <p style={{ color: "white" }}>{volume} %</p>
          <input
            className="Volume"
            type="range"
            max={100}
            min={0}
            step={1}
            value={volume}
            onChange={(e) => setVolume(parseInt(e.target.value))}
          />
          <audio src="/audio.mp3" ref={audioRef}></audio>
        </div>
      </div>
    </div>
  );
};

export default App;
