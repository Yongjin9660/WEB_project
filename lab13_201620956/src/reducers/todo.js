export const CREATE_TODO = "CREATE_TODO";
export const DELETE_TODO = "DELETE_TODO";
export const TOGGLE_TODO = "TOGGLE_TODO";



const todo = (state = [], action) => {
    switch(action.type){
        case CREATE_TODO:
            return [...state, {text: action.text, id:Date.now(), Done:0}];
        case DELETE_TODO:
            return state.filter(toDo => toDo.text !== action.text);
        case TOGGLE_TODO:
            return state.map(function(arr){
                if(arr.id === action.id){
                    if(arr.Done === 0){
                        arr.Done = 1;
                    }
                    else{
                        arr.Done = 0;
                    }
                    return arr;
                }
                else{
                    return arr;
                }
            });
        default:
            return state;
    }
}

export default todo;