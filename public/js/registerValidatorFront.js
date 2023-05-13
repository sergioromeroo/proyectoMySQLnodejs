const $ = id => document.getElementById(id); //lo guardo en una variable asi no escribo todo eso y solo pongo $
let correo = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/
let password = /^.{6,12}$/

//aca quiero que compare mi email cuando lo voy escribiendo y consumo el api q arme en apiusercontroller

    const verificoEmail = async () =>{
        try {
            const response = await fetch('/apis/emails')
            const result = await response.json()
            console.log(result.emailAll)
        } catch (error){
            console.log(error)
        }
    } 
    verificoEmail()


//esta change y el blur onchange te valida mientras escribis y blur es cuando salis del input ahi valida recien

$('nameValidatorJs').addEventListener('change', () =>{//evento de escucha y uso blur que se usa cuando salis del input y ahi marca el error

    if(!$('nameValidatorJs').value.trim()){//que quiero que pase cuando el input este  vacio
        $('nameValidatorJs').classList.add('is-invalid')
        $('errorNameSpan').innerHTML = "❌ vuelva y escriba el nombre hdp"
        
    }else{//de lo contrario si puso bien le saco invalid y le pongo q es valido 
        $('nameValidatorJs').classList.remove('is-invalid')//saco el agregar invalid 
        $('nameValidatorJs').classList.add('is-valid')     //agrego el valido
        $('errorNameSpan').innerHTML = '✔'

    }
})

/* para el email */

$('emailValidatorJs').addEventListener('blur', () =>{//evento de escucha y uso blur que se usa cuando salis del input y ahi marca el error

    if(!correo.test($('emailValidatorJs').value)){//que quiero que pase cuando el input este  vacio
        $('emailValidatorJs').classList.add('is-invalid')
        $('errorEmailSpan').innerHTML = "❌ escriba un email correcto"
        
    }else{//de lo contrario si puso bien le saco invalid y le pongo q es valido 
        $('emailValidatorJs').classList.remove('is-invalid')//saco el agregar invalid 
        $('emailValidatorJs').classList.add('is-valid')     //agrego el valido
        $('errorEmailSpan').innerHTML = '✔'

    }
})
                           /* para el password */
/* un focus para cuando apenas haga click en el input que le diga el msj al usuario de como escribirlo */
$('passwordValidatorJs').addEventListener('focus',() =>{
    $('errorPasswordSpan').innerHTML = "la contraseña debe tener entre 6 a 12 caracteres"
})


$('passwordValidatorJs').addEventListener('blur', () =>{//evento de escucha y uso blur que se usa cuando salis del input y ahi marca el error

    if(!password.test($('passwordValidatorJs').value)){//que quiero que pase cuando el input este  vacio
        $('passwordValidatorJs').classList.add('is-invalid')
        $('errorPasswordSpan').innerHTML = "❌ no cumple con los requisitos"
        
    }else{//de lo contrario si puso bien le saco invalid y le pongo q es valido 
        $('passwordValidatorJs').classList.remove('is-invalid')//saco el agregar invalid 
        $('passwordValidatorJs').classList.add('is-valid')     //agrego el valido
        $('errorPasswordSpan').innerHTML = '✔'

    }
})

/* contraseña 2 comparar las contraseñas */

$('password2ValidatorJs').addEventListener('blur', () =>{//evento de escucha y uso blur que se usa cuando salis del input y ahi marca el error

    if($('passwordValidatorJs').value.trim() !== $('password2ValidatorJs').value.trim()){//que quiero que pase cuando el input este  vacio
        $('password2ValidatorJs').classList.add('is-invalid')
        $('errorPassword2Span').innerHTML = "❌ las contraseñas no coinciden"
        
    }else{//de lo contrario si puso bien le saco invalid y le pongo q es valido 
        $('password2ValidatorJs').classList.remove('is-invalid')//saco el agregar invalid 
        $('password2ValidatorJs').classList.add('is-valid')     //agrego el valido
        $('errorPassword2Span').innerHTML = '✔'

    }
})

/* si pongo enviar el boton quiero que me salten todos los errores juntos entonces lo recorro con un for  no me estaria andando video 85 */

/*     $('form-validacion-frontjs').addEventListener('submit', e => {
        e.preventDefault()

        let elementoForm = $('form-validacion-frontjs').elements //para no andar escribiendo todo esto lo guardo en variable elementoform
    
        for (let i = 0; i < elementoForm.length - 1 ; i++) {

            if(!elementoForm[i].value){
                elementoForm[i].classList.add('is-invalid')
                $('error-all').innerHTML = '<div class="alert alert-warning" role="alert" id="error-all"> completar los campos obligatoriso</div>'
            }
            
        }
    
    }) */


