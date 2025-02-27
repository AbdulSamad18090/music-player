import { createSlice } from "@reduxjs/toolkit";

// Load state from sessionStorage
const loadState = () => {
  if (typeof window !== "undefined") {
    const storedState = sessionStorage.getItem("playerState");
    return storedState ? JSON.parse(storedState) : null;
  }
  return null;
};

const initialState = loadState() || {
  currentSong: null,
  isPlaying: false,
  volume: 50,
  progress: 0,
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    playSong: (state, action) => {
      state.currentSong = action.payload;
      state.isPlaying = true;
    },
    togglePlayPause: (state) => {
      state.isPlaying = !state.isPlaying;
    },
    setVolume: (state, action) => {
      state.volume = action.payload;
    },
    setProgress: (state, action) => {
      state.progress = action.payload;
    },
  },
});

export const { playSong, togglePlayPause, setVolume, setProgress } =
  playerSlice.actions;

export default playerSlice.reducer;
