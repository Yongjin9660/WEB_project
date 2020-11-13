function ajaxDelete(id){
    var xhr = new XMLHttpRequest();

    xhr.onload = function(){
        alert("삭제");
        if(xhr.status === 200 || xhr.status === 201){
            let deleteMovie = document.getElementById("movie"+id);
            deleteMovie.remove();
            alert("삭제 성공!");
            console.log(id);
        }else {
            alert("삭제 실패");
        }
    }

    xhr.open("POST", "/routes/movie/delete/" +id);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send();
}