import React from 'react';
import { useRef } from 'react';
import {FaEdit} from 'react-icons/fa';
import {IoCheckmarkDoneSharp} from 'react-icons/io5';
import {AiFillDelete, AiFillCloseCircle} from 'react-icons/ai';
//import Draggable from 'react-draggable';
import { Card } from "@material-ui/core";
import  {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd';
import { Provider } from 'react-redux';


const TodoItem = (props) => {
    const {item, todos, updateTodo, removeTodo, completeTodo, searchTodo, closeSearchTodo, dragDropTodo} = props;
    console.log(props)
    const inputRef = useRef(true); 

    const changeFocus = () =>{
        inputRef.current.disabled = false;
        inputRef.current.focus();
    }

    const update = (id, value, e) =>{
        if(e.which === 13){                                      //Here 13 is the key code for enter key
            updateTodo({id, item: value});
            inputRef.current.disabled = true;
        }
    }

    const reorder = (list, startIndex, endIndex) => {
        const result = Array.from(list);
        const [removed] = result.splice(startIndex, 1);
        result.splice(endIndex, 0, removed);
      
        return result;
      };
      

    const onDragEnd =(result)=> {
        // dropped outside the list
        if (!result.destination) {
          return;
        }
    
        const items = reorder(
          props.todos,
          result.source.index,
          result.destination.index
        );

        dragDropTodo(items)
    
      }

      const getItemStyle = (isDragging, draggableStyle) => ({
        // some basic styles to make the items look a bit nicer
        userSelect: "none",
        padding: 8 * 2,
        margin: `0 0 8px 0`,
      
        // change background colour if dragging
        background: isDragging ? "lightgreen" : "grey",
      
        // styles we need to apply on draggables
        ...draggableStyle
      });
      
      const getListStyle = isDraggingOver => ({
        background: isDraggingOver ? "lightblue" : "lightgrey",
        padding: 8,
        width: 250
      });

    //const cardStyle={margin: "5px" ,height:'12vh'}

    console.log(todos)

    return (
        <DragDropContext onDragEnd={()=>onDragEnd()}>
        <Droppable droppableId="droppable">{
            (provided, snapshot)=>(
                <div  {...provided.droppableProps} ref={provided.innerRef} //style={getListStyle(snapshot.isDraggingOver)}
                >
                {
                    
                    todos.map((item, index)=>{

                        return <>
                                                      
                                <Draggable key={item.id} draggableId={`key-${item.id}`} index={index}>
                                 {(provided,snapshot) => (
                                   <div
                                     ref={provided.innerRef}
                                     {...provided.draggableProps}
                                     {...provided.dragHandleProps}
                                    //  style={getItemStyle(
                                    //     snapshot.isDragging,
                                    //     provided.draggableProps.style
                                    //   )}
                                    >
                                    {item.search === false  ?  
                                    <li key={item.id} className="card">
                                    <textarea ref= {inputRef} disabled={inputRef} defaultValue={item.item} onKeyPress={(e) => update(item.id, inputRef.current.value, e)}/>
                                        <div className="btns">
                                            <button onClick={()=> changeFocus()}><FaEdit /></button>
                                            <button onClick={()=> completeTodo(item.id)}><IoCheckmarkDoneSharp /></button>
                                            <button style={{color:'#EC2D5B'}} onClick={()=> removeTodo(item.id)}><AiFillDelete /></button>
                                        </div>
                                    {item.completed && <span className="completed">Done</span>}
                                </li>

                                :

                                <li key={item.id} className="card">
                                    <textarea ref= {inputRef} disabled={inputRef} defaultValue={item.item} onKeyPress={(e) => update(item.id, inputRef.current.value, e)}/>
                                        <div className="btns">
                                            <button onClick={()=> changeFocus()}><FaEdit /></button>
                                            <button onClick={()=> completeTodo(item.id)}><IoCheckmarkDoneSharp /></button>
                                            <button style={{color:'#EC2D5B'}} onClick={()=> removeTodo(item.id)}><AiFillDelete /></button>
                                            <button style={{color:'#EC2D5B'}} onClick={()=>closeSearchTodo(item.item)}><AiFillCloseCircle /></button>
                                        </div>
                                    {item.completed && <span className="completed">Done</span>}
                                </li>
                                }
                                    </div>)}


                                
                               </Draggable>
                            

                        </>
                    })
                 }  
                {provided.placeholder}
               </div>
    )
        }
        
        </Droppable>
      </DragDropContext>
    )
}

export default TodoItem
