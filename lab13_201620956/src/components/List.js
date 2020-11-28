import React, { useState } from "react";
import { act } from "react-dom/test-utils";
import { connect } from "react-redux";
import { actionCreators } from '../actions/todo';


function List({text, Done, onBtnClick, onToggle }) {
    if(Done === 1){
        return (<ul>
            <li style={{background:"blue"}}>
                <span>{text}</span>
                <button onClick={onToggle}>완료</button>
                <button onClick={onBtnClick}>삭제</button>
            </li>
        </ul>);
    }
    return (<ul>
        <li>
            <span>{text}</span>
            <button onClick={onToggle}>완료</button>
            <button onClick={onBtnClick}>삭제</button>
        </li>
    </ul>);

}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        onToggle: () => dispatch(actionCreators.toggleTodo(ownProps.id)),
        onBtnClick: () => dispatch(actionCreators.deleteTodo(ownProps.text))
    };
}

export default connect(null, mapDispatchToProps)(List);