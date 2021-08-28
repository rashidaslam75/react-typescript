import { AnyAction, createSlice } from "@reduxjs/toolkit";

interface IApp {
  loading: boolean;
}

const initialState: IApp = {
  loading: false,
}

const isPending = (action: AnyAction) => action.type.endsWith("/pending");
const isRejected = (action: AnyAction) => action.type.endsWith("/rejected");

const hasPrefix = (action: AnyAction, prefix: string) =>
  action.type.startsWith(prefix);

const isPendingAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => { // Note: this cast to AnyAction could also be `any` or whatever fits your case best
  return hasPrefix(action, prefix) && isPending(action);
};

const isRejectedAction = (prefix: string) => (
  action: AnyAction
): action is AnyAction => { // Note: this cast to AnyAction could also be `any` or whatever fits your case best - like if you had standardized errors and used `rejectWithValue`
  return hasPrefix(action, prefix) && isRejected(action);
};


const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    loading: (state, action) => {
      state.loading = action.payload;
    }
  },
  extraReducers: builder => {
    builder.addMatcher(isRejectedAction(''), (state, action) => {
      state.loading = false;
    })
    builder.addMatcher(isPendingAction(''), (state, action) => {
      state.loading = true;
    })
  }
})

export const { loading:loadingAction } = appSlice.actions;

export default appSlice.reducer;