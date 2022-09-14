const socket = io();

// Productos
socket.on('from-server-producto', data => {
   if(data.DB_PRODUCTOS.length == 0){
    renderSinProd()
   }else{
    render(data.DB_PRODUCTOS)
   }
    
});

function render(data){
      const htmlCuerpo = data.map(prod =>{
          return `<tr>
          <td>${prod.PR_TITLE}</td>
          <td>${prod.PR_PRICE}</td>
          <td><img src=${prod.PR_THUMBNAILS} width="30"></td>
        </tr>`;
        
      })

      const table = '<div class="table-responsive"><table class="table table-dark"><tr style="color: yellow;"> <th>Nombre</th> <th>Precio</th> <th>Imagen</th> </tr>'+htmlCuerpo+'</table></div>'

      document.querySelector('#productos').innerHTML =table;
      
      document.querySelector('#title').value= "";
      document.querySelector('#price').value= "";
      document.querySelector('#thumbnail').value= "";

  }

  function renderSinProd(){
     const htmlCuerpo = '<h3 class="alert alert-warning">No hay productos</h3>';
     document.querySelector('#productos').innerHTML = htmlCuerpo;

  }

// Chat
function habilitarButton(){

  var texto = document.getElementById("email").value;
  var regex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  
  if (!regex.test(texto)) {
    document.getElementById('buttonMensaje').disabled = 'disabled'
  } else {
    document.getElementById('buttonMensaje').removeAttribute('disabled');
    document.getElementById("emailMensaje").value= texto;
  }
  
}

socket.on('from-server-mensajes', data => {
  renderMensaje(data.DB_MENSAJES);
});

function renderMensaje(mensajes) {
  const cuerpoMensajesHTML = mensajes.map( msj =>{
      return `<div class="col-12 cont">
                <b class="colorBlue">${msj.ME_EMAIL}</b>
                <p class="colorBrown">[${msj.ME_FECHA}]:</p> 
                <span class="textMessage">${msj.ME_MENSAJE}</span>
              </div>
              <br><br>`;
  }).join("");  

  document.querySelector('#historial').innerHTML = cuerpoMensajesHTML;
  document.querySelector('#message').value = "";
}


