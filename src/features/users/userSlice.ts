import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { loadingAction } from "../../app/appSlice";
import { networkService } from "../../services/network-service";
import { RootState } from "../../store/store";

interface Albums {
  userId: number,
  id: number;
  title: string;
}
export interface Photo {
  albumId: number,
  id: number;
  title: string;
  url: string;
  thumbnailUrl: string;
}
interface User {
  id: number;
  name: string;
  phone: string;
  email: string;
  username: string;
  website: string;
}

type UserState = {
  users: User[],
  selectedUser: User,
  selectedUserAlbums: Albums[]
  photos: Photo[]
}

const initialState: UserState = {
  users: [],
  selectedUserAlbums: [],
  selectedUser: {} as User,
  photos: []
}

export const getUsersActions = createAsyncThunk(
  'users/getUsers',
  async (_, { rejectWithValue, dispatch }) => {
    try {
      const response = await networkService.get('/users');
      dispatch(loadingAction(false))
      return response.data;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getUsersAlbumsActions = createAsyncThunk(
  'users/getAlbums',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await networkService.get(`/users/${id}/albums`);
      dispatch(loadingAction(false))
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getAlbumPhotosActions = createAsyncThunk(
  'users/getAlbumPhotos',
  async (id: number, { rejectWithValue, dispatch }) => {
    try {
      const response = await networkService.get(`/albums/${id}/photos`);
      dispatch(loadingAction(false))
      return { id, data: response.data };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {

  },
  extraReducers: builder => {
    builder.addCase(getUsersActions.fulfilled, (state: UserState, action: PayloadAction<User[]>) => {
      state.users = action.payload
    })
    builder.addCase(getUsersAlbumsActions.fulfilled, (state: UserState, action: PayloadAction<{ id: number, data: Albums[] }>) => {
      state.selectedUserAlbums = action.payload.data;
      const user = state.users.find(x => x.id === action.payload.id)
      if (user) {
        state.selectedUser = user;
      }
    })
    builder.addCase(getAlbumPhotosActions.fulfilled, (state: UserState, action: PayloadAction<{ id: number, data: Photo[] }>) => {
      state.photos = action.payload.data;
    })
  }
})

export const userSelector = (rootState: RootState) => rootState.user;
export const selectedUserSelector = (rootState: RootState) => rootState.user.selectedUser;
export const albumSelector = (rootState: RootState) => rootState.user.selectedUserAlbums;
export const photosSelector = (rootState: RootState) => rootState.user.photos;

export const { reducer: userReducer } = userSlice;