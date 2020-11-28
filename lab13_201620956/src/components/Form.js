import React, { useState } from "react";
import { connect } from 'react-redux';
import { actionCreators } from '../actions/todo';

function Form({ dispathCreate }) {
    const [text, setText] = useState("");

    function onCreateTodo() {
        dispathCreate(text);
        setText("");
    }

    return (
        <div className="Form">
            <input type="text" value={text} onChange={(e) => {
                setText(e.target.value);
            }}></input>
            <button onClick={onCreateTodo}>OK</button>
        </div>
    );

}

function mapStateToProps(state) {
    return { toDos: state };
}

function mapDispatchToProps(dispatch, ownProps) {
    return {
        dispathCreate: text => dispatch(actionCreators.createTodo(text))
    };
  }


export default connect(mapStateToProps, mapDispatchToProps)(Form);