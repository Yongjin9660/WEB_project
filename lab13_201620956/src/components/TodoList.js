import React, { useState } from "react";
import { connect } from 'react-redux';
import { actionCreators } from '../actions/todo';
import todo from "../reducers/todo";

import Form from './Form';
import List from './List';

function TodoList({ toDos }) {
    
    // console.log('Here');

    var Done_number=0;
    toDos.todo.forEach(element => {
        if(element.Done === 1){
            Done_number++;
        }
    });


    return (
        <div className="TodoList">
            <span>Total: {toDos.todo.length} Done:{Done_number}</span>
            <Form />
            {toDos.todo.map(toDo => (
                <List key={toDo.id} Done={todo.Done} {...toDo} />
            ))}
        </div>
    );

}

function mapStateToProps(state) {
    return { toDos: state };
}

export default connect(mapStateToProps, null)(TodoList);