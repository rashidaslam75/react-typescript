import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

interface ITodo {
  text: string;
  id: string
}

type TodoState = {
  todos: ITodo[];
}
const initialState: TodoState = {
  todos: [],
}

export const incrementAsync = createAsyncThunk(
  'todo/fetch',
  async () => {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
    // The value we return becomes the `fulfilled` action payload
    return response
  }
);


const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    create: (state: TodoState, action: PayloadAction<ITodo>) => {
      state.todos.push(action.payload)
    },
    remove: (state: TodoState, { payload }) => {
      state.todos.filter(x => x.id !== payload.id)
    },

  },
  extraReducers: builder => {
    builder.addCase(incrementAsync.fulfilled,(state)=>{
      debugger
    })
  }
})

const { reducer, actions } = todoSlice;

export const todoSelector = (state: RootState) => state.todos;

export const { create: createTodo, remove: removeTodo } = actions;

export default reducer