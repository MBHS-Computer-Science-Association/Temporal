
function addInput(divName){
      var newdiv = document.createElement('div');
      newdiv.innerHTML = " <br><input type='text' name='myInputs[]' placeholder='Relationship'>";
      document.getElementById(divName).appendChild(newdiv);
}
