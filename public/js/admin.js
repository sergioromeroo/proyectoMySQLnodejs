const $ = id => document.getElementById(id);

console.log('se conecto con la vista y js')

$('tabla-productos').innerHTML = null; //limpia la caja padre de lo q tengo

const cargaProductos = async () => {
    try {
        let respuesta = await fetch('/apis/admin-products');
        let resultado = await respuesta.json();

        //voy a forechear todo lo de abajo para que me lo recorra de la base de datos 
        resultado.all.forEach(product => {
            agregoItem(product)
        });

        /* aca va paginador lo reccorro con un for */
        paginador(resultado.meta.cantidad,15,2,1) //(all/limit/vercada5)aca va el all , el limit , vercada3 y actual q puse abajo

    } catch (error) {
        console(error)
    }
}
cargaProductos()



const agregoItem = product => { //esto me va a ir creando en la tabla del admin
    let item = `    
    <tr>
        <th scope="row">${product.id} </th>
        <td>${product.name} </td>
        <td>${product.price} </td>
        <td>${product.category.name} </td>
        <td class="d-flex justify-content-around">
            <a class="btn btn-sm btn-success"
            href="/products/edit/${product.id} "><i class="fas fa-edit"></i></a>
        <div>
            <form
                action="/products/delete/${product.id}?_method=DELETE"
                method="POST" id="formDelete${product.id}">
                <button 
                    class="btn btn-sm btn-danger"
                    type='submit'
                    onclick="confirmRemove(event,document.querySelector('#formDelete${product.id}'))"
                ><i class="fas fa-trash-alt"></i></button>
            </form>
        </div>
        </td>
</tr>`

    $('tabla-productos').innerHTML += item //son muchos productos asi que lo voy agregando todos 
}



/* aca va el paginador <12345> */

function paginador(all, limit, vercada5, actual) {
    let paginas = Math.ceil(all / limit)//el ceil me da numero entero me lo redondea
    $('caja-paginadora').innerHTML = //este va ser diferente a los demas por eso lo separo porque no tiene q mostrar volver cuando estoy del comienzo
        `
    <li class="page-item disabled">
    <a class="page-link">Volver</a>
    </li>
    `

    for (let i = 1; i < paginas / vercada5; i++) {//mostrame de la pagina 1 hasta la ultima pagina
        $('caja-paginadora').innerHTML +=
        `
    <li class="page-item ${actual == i ? 'active' : null}" onclick="siguientePagina(event,${i},${limit})"> 
    <a class="page-link" href="#">${i}</a>
    </li>
    `

    }


    $('caja-paginadora').innerHTML +=
        `
    <li class="page-item">
    <a class="page-link" href="#">Siguiente</a>
    </li>
    `
}

//quiero q me muestre la pagina q piso no las primeras 10 por eso uso ACTUAL actual 
const siguientePagina = async (event,actual,limit) =>{
    event.preventDefault(); //quiero prevenir cuando toco una a 
    $('tabla-productos').innerHTML = null; //limpia la caja porque voy quiero mostrar 10 en 10
    $('caja-paginadora').innerHTML = null //cada vez q pida una pagina quiero q se borre

    try {
        let respuesta = await fetch(`/apis/admin-products?actual=${actual}&limit=${limit}`);
        let resultado = await respuesta.json();

        //voy a forechear todo lo de abajo para que me lo recorra de la base de datos 
        resultado.all.forEach(product => {
            agregoItem(product)
        });

        /* aca va paginador lo reccorro con un for */
        paginador(resultado.meta.cantidad,limit,2,actual) //(all/limit/vercada5)aca va el all  el limit y vercada3 q puse abajo

    } catch (error) {
        console(error)
    }


}



