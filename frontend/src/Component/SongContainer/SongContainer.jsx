import React, { useState } from 'react'
import './SongContainer.css'; 
const SongContainer = ({ Songs }) => {
  const [isplaying, setIsPlaying] = useState(null);
  const handlePlay = (index) => {
    if (isplaying === index) {
      setIsPlaying(null); // Pause the song
    } else {
      setIsPlaying(index); // Play the selected song
    }
  };
  return (
    <div className="songcontainer">
      {Songs.map((song, index) => (
        <React.Fragment key={index}>
          <div className="song">
            <div className="songdetail">
              <h3>{song.title}</h3>
              <p>{song.artist}</p>
            </div>
            {
            isplaying===index &&
            <audio src={song.audio} controls style={{
              display: 'none',
            }}
            autoPlay={isplaying === index}
            ></audio>
          }
            <button className='pl-pa-btn' onClick={()=>handlePlay(index)}>
              {isplaying === index ?<i className="ri-pause-mini-line"></i> : <i className="ri-play-fill"></i>}
            </button>
          </div>
          <div className="seperating-line"></div>
        </React.Fragment>
      ))}
    </div>
  );
};


export default SongContainer
