import {React, useState} from 'react';
import { connect } from 'react-redux';
import { addTodos, completeTodos, removeTodos, updateTodos, searchTodos, closeSearchTodos, dragDropTodos } from '../redux/reducer';
import TodoItem from './TodoItem';
//import Draggable from 'react-draggable';


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
        searchTodo : (obj)  => dispatch(searchTodos(obj)),
        closeSearchTodo: (item)=> dispatch(closeSearchTodos(item)),
        dragDropTodo: (item) => dispatch(dragDropTodos(item)),
        
    }
}

const DisplayTodos = (props) => {
    const [sort, setSort] = useState('');
    console.log(props)
    return (
        
        <div className="displaytodos">
            <ul className="search">
                 {/**For search items */}
                 {
                    props.todos.length > 0 && sort !== 'completed' && sort !== 'active' ?

                    props.todos.map(item =>{
                        return (
                            item.search === true && 
                            <TodoItem 
                                key={item.id}
                                item={item}
                                removeTodo={props.removeTodo}
                                updateTodo={props.updateTodo}
                                completeTodo={props.completeTodo}
                                searchTodo={props.searchTodo} 
                                closeSearchTodo={props.closeSearchTodo}/>
                        )
                        
                    }) 
                    : null
                }
            </ul> 

            <div className="buttons">
                <button onClick={()=>setSort('active')}>Active</button>
                <button onClick={()=>setSort('completed')}>Completed</button>
                <button onClick={()=>setSort('all')}>All</button>
            </div>
            <ul>
            {<TodoItem 
                            todos={props.todos || []}
                            removeTodo={props.removeTodo}
                            updateTodo={props.updateTodo}
                            completeTodo={props.completeTodo}
                            searchTodo={props.searchTodo}
                            dragDropTodo={props.dragDropTodo} />}
            </ul>
            
            {/* 
                 <ul>
               
                {
                    props.todos.length > 0 && sort === '' ?

                    (
                            
                        <TodoItem 
                            todos={props.todos || []}
                            removeTodo={props.removeTodo}
                            updateTodo={props.updateTodo}
                            completeTodo={props.completeTodo}
                            searchTodo={props.searchTodo}
                            dragDropTodo={props.dragDropTodo} />
                    )
                    : null
                }


               
                {
                    props.todos.length > 0 && sort === 'active' ?

                   
                        (
                            
                            <TodoItem 
                                todos={props.todos || []}
                                removeTodo={props.removeTodo}
                                updateTodo={props.updateTodo}
                                completeTodo={props.completeTodo}
                                searchTodo={props.searchTodo}
                                dragDropTodo={props.dragDropTodo} />
                        )
                   
                    : null
                }

                
                {
                    props.todos.length > 0 && sort === 'completed' ?

                    (
                            
                        <TodoItem 
                            todos={props.todos || []}
                            removeTodo={props.removeTodo}
                            updateTodo={props.updateTodo}
                            completeTodo={props.completeTodo}
                            searchTodo={props.searchTodo}
                            dragDropTodo={props.dragDropTodo} />
                    )
                    : null
                }

                
                {
                    props.todos.length > 0 && sort === 'all' ?

                    (
                            
                        <TodoItem 
                            todos={props.todos || []}
                            removeTodo={props.removeTodo}
                            updateTodo={props.updateTodo}
                            completeTodo={props.completeTodo}
                            searchTodo={props.searchTodo}
                            dragDropTodo={props.dragDropTodo} />
                    )
                   
                    : null
                }
            </ul>
            */}   
           
        </div>
        
    )
}

export default connect(mapStateToProps, mapDispatchToProps)(DisplayTodos);
