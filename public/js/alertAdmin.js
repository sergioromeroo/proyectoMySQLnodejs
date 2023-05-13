/* EVENTOS MAS USADOS :

onclick =     cuando el usuario hace click
ondblclick =  cuando el usuario hace doble click
onmouseover = cuando el mouse se mueve sobre el elemento
onmousemove = cuando se mueve el mouse
onscroll =    cuando se hace scroll
onkeydown =   cuando se aprieta una tecla
onload =      cuando se carga la pagina
onsubmit =    cuando se envia un formulario


*/




window.onload= function(){
    const boton = document.getElementById('botonAlert')

    boton.onclick = function(evento){
        evento.preventDefault()
        let respuesta = confirm('seguro quieres eliminar este producto?')
        
        if (respuesta) {
            Swal.fire({
                position: 'center',
                icon: 'success',
                title: 'se ah borrado exitosamente',
                showConfirmButton: false,
                timer: 2500
              })
        }
    }
}