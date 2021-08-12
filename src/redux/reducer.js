import { createSlice} from "@reduxjs/toolkit";

const initialState = [] ;

const addTodoReducer = createSlice({
    name:'todos',
    initialState,
    reducers:{
        //Write your reducers here.

        //Adding todos
        addTodos : (state, action) =>{
            state.push(action.payload);
            return state;
        },

        //Remove todos
        removeTodos : (state, action) =>{
            return state.filter(item => item.id !== action.payload);    
        },

        //Update todos
        updateTodos : (state, action) =>{
            return state.map((todo) =>{
                if(todo.id === action.payload.id){
                    return {
                        ...todo,
                        item: action.payload.item,
                        search: false,
                    }
                }
                return todo
            })
        },

        //Completed Todos
        completeTodos : (state, action) =>{
            return state.map((todo) =>{

                if(todo.id===action.payload){
                    return {
                        ...todo,
                        completed: (todo.completed==true) ? false : true,
                        search: false
                    }
                }
                return todo
            })
        },

        //Search todos
        searchTodos : (state, action) =>{
            
            return state.map((todo) =>{
                if(todo.item === action.payload){
                    
                    return {
                        ...todo,
                        search: true,
                    }
                }else{
                    return {
                        ...todo,
                        search: false,
                    }
                }
                return todo
            })
        },

        //close search
        closeSearchTodos : (state, action) =>{
            
            return state.map((todo) =>{
                if(todo.item === action.payload){
                    
                    return {
                        ...todo,
                        search: false,
                    }
                }
                return todo
            })
        },

        //dragDropTodos
        dragDropTodos : (state, action) =>{
            
            return {
                ...state,
                todos: action.payload
            }
        },

        

    }
})

export const {addTodos, removeTodos, updateTodos, completeTodos, searchTodos, closeSearchTodos, dragDropTodos} = addTodoReducer.actions;
export const reducer = addTodoReducer.reducer;