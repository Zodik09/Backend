import React, { useState, useRef } from "react";

const MoodSongs = ({ songs }) => {
  const [currentSong, setCurrentSong] = useState(null); // stores currently playing song id
  const audioRef = useRef(null);

  const handlePlayPause = (song) => {
    if (currentSong === song._id) {
      // If same song is playing → pause it
      audioRef.current.pause();
      setCurrentSong(null);
    } else {
      // Play new song
      if (audioRef.current) {
        audioRef.current.src = song.audio; // ✅ using song.audio
        audioRef.current.play();
      }
      setCurrentSong(song._id);
    }
  };

  return (
    <div >
      <h1>Songs List</h1>
      <div className="songsContainer">{songs && songs.length > 0 ? (
        songs.map((song, index) => (
          <div className="songs"
            key={song._id || index}
          >
            <h3>{song.title}</h3>
            <p>🎵 {song.artist}</p>

            <button
              onClick={() => handlePlayPause(song)}
              style={{
                background:
                  currentSong === song._id ? "#dc3545" : "#28a745",
              }}
            >
              {currentSong === song._id ? "Pause" : "Play"}
            </button>
          </div>
        ))
      ) : (
        <p>No face detected.</p>
      )}</div>

      {/* hidden single audio element for playback */}
      <audio ref={audioRef} onEnded={() => setCurrentSong(null)} />
    </div>
  );
};

export default MoodSongs;
