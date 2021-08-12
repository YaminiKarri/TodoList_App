import React, {useState, useRef} from 'react'
import { connect } from 'react-redux';
import { addTodos, completeTodos, removeTodos, updateTodos, searchTodos , closeSearchTodos} from '../redux/reducer';
import {GoPlus} from 'react-icons/go';


const mapStateToProps = (state) =>{
    return {
        todos: state,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        addTodo : (obj) => dispatch(addTodos(obj)),
        removeTodo : (id) => dispatch(removeTodos(id)),
        updateTodo : (obj) => dispatch(updateTodos(obj)),
        completeTodo : (id) => dispatch(completeTodos(id)),
        searchTodo : (term)  => dispatch(searchTodos(term)),
        closeSearchTodo: (item)=> dispatch(closeSearchTodos(item))
    };
};

const Todos = (props) => {
    const [todo, setTodo] = useState('');
    const [searchTerm, setSearchTerm] = useState('');

    const handleChange = (e) =>{
        setTodo(e.target.value);
        setSearchTerm(e.target.value);
        props.searchTodo(searchTerm);
        
    }

    return (
        <div className='addTodos'>
           <input type="text" onChange={(e) => handleChange(e)} className="todo-input" value={todo}/>
           <button className="add-btn" onClick={() => props.addTodo({
               id: Math.floor(Math.random()*1000),                                      //Adding a todo item to the list
               item: todo,
               completed:false,
               search: false
           })}><GoPlus /></button>
        </div>
    )
}

//connecting this component with redux store using connect
export default connect(mapStateToProps, mapDispatchToProps)(Todos);
