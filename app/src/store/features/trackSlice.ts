import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TrackType } from "../../types";

interface TrackState {
  trackList: TrackType[];
  currentTrack: TrackType | null;
}

const initialState: TrackState = {
  trackList: [],
  currentTrack: null,
};

const trackSlice = createSlice({
  name: "tracks",
  initialState,
  reducers: {
    setTracks: (state, action: PayloadAction<TrackType[]>) => {
      state.trackList = action.payload;
    },
    setCurrentTrack: (state, action: PayloadAction<TrackType>) => {
      state.currentTrack = action.payload;
    },
  },
});


export const {setTracks,setCurrentTrack}= trackSlice.actions
export default trackSlice.reducer