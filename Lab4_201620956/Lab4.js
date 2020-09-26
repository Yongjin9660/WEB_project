document.querySelector("#btn1").addEventListener("click", function (){
  var text = document.querySelector("#textarea1").value;
  if(text === ""){
    return;
  }
  var newArticle = document.createElement("article");
  newArticle.innerHTML = `<textarea class="inputText">${text}</textarea>`;
  document.querySelector("#textarea1").value="";
  document.querySelector("#section").appendChild(newArticle);

  var numText = document.querySelector("#section").querySelectorAll("article").length;
  document.querySelector("#num_text").innerHTML = numText;
});
