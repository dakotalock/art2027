import React, { useState, useEffect } from 'react';
import { FaPlay, FaPause } from 'react-icons/fa';
import AudioPlayer from 'react-audio-player';

const App = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentQuote, setCurrentQuote] = useState(0);
  const [backgroundColor, setBackgroundColor] = useState('bg-blue-200');

  const quotes = [
    "Art is not what you see, but what you make others see. - Edgar Degas",
    "Music is the divine way to tell beautiful, poetic things to the heart. - Pablo Casals",
    "Every artist was first an amateur. - Ralph Waldo Emerson",
    "The purpose of art is washing the dust of daily life off our souls. - Pablo Picasso",
  ];

  const artGallery = [
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />,
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />,
    <div className="bg-gray-200 border-2 border-dashed rounded-xl w-16 h-16" />,
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuote((prev) => (prev + 1) % quotes.length);
      setBackgroundColor((prev) =>
        prev === 'bg-blue-200' ? 'bg-purple-200' : 'bg-blue-200'
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [quotes.length]);

  return (
    <div className={`${backgroundColor} min-h-screen flex flex-col items-center justify-center p-8 transition-colors duration-500`}>
      <h1 className="text-4xl font-bold mb-8">Interactive Art Project</h1>

      {/* Music Player */}
      <div className="mb-8">
        <AudioPlayer
          src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
          autoPlay={false}
          controls
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
        />
        <div className="flex items-center mt-4">
          {isPlaying ? (
            <FaPause className="text-2xl text-gray-700" />
          ) : (
            <FaPlay className="text-2xl text-gray-700" />
          )}
          <span className="ml-2 text-gray-700">{isPlaying ? 'Playing' : 'Paused'}</span>
        </div>
      </div>

      {/* Art Gallery */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {artGallery.map((art, index) => (
          <div key={index} className="p-4">{art}</div>
        ))}
      </div>

      {/* Quotes */}
      <div className="text-center text-lg font-medium text-gray-800">
        <p>{quotes[currentQuote]}</p>
      </div>
    </div>
  );
};

export default App;