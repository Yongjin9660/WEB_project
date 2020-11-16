function ajaxDelete(id){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        //alert("삭제");
        if(xhr.status === 200 || xhr.status === 201){
            let deleteMovie = document.getElementById("movie"+id);
            deleteMovie.remove();
            //alert("삭제 성공!");
            console.log(id);
        }else {
            alert("삭제 실패");
        }
    }
    xhr.open("POST", "/routes/movie/delete/" +id);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send();
}

function ajaxEdit(id){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        //alert("수정");
        if(xhr.status === 200 || xhr.status === 201){
            let response = xhr.response;
            document.getElementById('editfile').innerHTML= response;
            document.getElementById('movie_list').style.display = 'none';
            //alert("수정 성공!");
        }else {
            alert("수정 실패");
        }
    }

    xhr.open("GET", "/routes/movie/read/" + id);
    xhr.send();
}

function ajaxStar(id){
    var xhr = new XMLHttpRequest();
    xhr.onload = function(){
        //alert("별");
        if(xhr.status === 200 || xhr.status === 201){
            var response = JSON.parse(xhr.response);
            if(response.movie.trending === true){
                document.getElementById('star' + response.movie._id).src = "/images/star.svg"
            }else{
                document.getElementById('star' + response.movie._id).src = "/images/black-star.svg"
            }
            location.reload();
            //alert('별 성공');
        }else {
            alert("별 실패");
        }
    }
    xhr.open("POST", "/routes/movie/update/" + id);
    xhr.setRequestHeader("Content-Type", 'application/json');
    xhr.send();
}
