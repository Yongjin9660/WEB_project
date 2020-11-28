
export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";

const createTodo = (text, id) =>{
    return{
        type : CREATE_TODO,
        text,
        id
    };
}

const deleteTodo =  text => {
    return{
        type : DELETE_TODO,
        text
    };
}

const toggleTodo = (id) => {
    return{
        type : TOGGLE_TODO,
        id
    };
}

export const actionCreators = {
    createTodo,
    deleteTodo,
    toggleTodo
}