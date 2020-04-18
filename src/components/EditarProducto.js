import React, {useState, useRef} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import Error from './Error';

function EditarProducto(props) {
    //Destructuring de props
    const {history, producto, guardarRecargarProductos} = props;
    //Generar los refs
    const precioProductoRef = useRef('');
    const nombreProductoRef = useRef('');
    const referenciaProductoRef = useRef('');
    const stockProductoRef = useRef('');
    const pesoProductoRef = useRef('');

    const [error, guardarError] = useState(false);
    const [categoria, guardarCategoria] = useState('');

    const editarProducto = async e => {
        e.preventDefault();
        //Validacion
        const nuevoNombreProducto = nombreProductoRef.current.value,
              nuevoPrecioProducto = precioProductoRef.current.value,
              nuevoPesoProducto = pesoProductoRef.current.value,
              nuevaReferenciaProducto = referenciaProductoRef.current.value,
              nuevoStockProducto = stockProductoRef.current.value;

        //Revisar si cambio la catgeoria de lo contrario asignar el mismo valor
        let categoriaProducto = (categoria === '') ? producto.categoria : categoria;
        if(nuevoNombreProducto === '' || nuevoPrecioProducto === '' || nuevoPesoProducto === '' || nuevaReferenciaProducto === '' || nuevoStockProducto === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //Obtener los valores del formulario
        const editarProducto = {
            precioProducto : nuevoPrecioProducto,
            nombreProducto : nuevoNombreProducto,
            pesoProducto : nuevoPesoProducto,
            referenciaProducto : nuevaReferenciaProducto,
            stockProducto : nuevoStockProducto,
            categoria : categoriaProducto
        }
        //Enviar el Request
        const url = `http://localhost:4000/Inventario/${producto.id}`;
        try {
            const resultado = await axios.put(url, editarProducto);
            if(resultado.status === 200) {
                Swal.fire(
                    '¡Producto editado!',
                    '¡El producto fue edito correctamente!',
                    'success'
                )
            }
        } catch (error) {
            console.log(error);
            Swal.fire({
                type: 'error',
                title: 'Error',
                text: 'Hubo un error, vuelva a intentarlo.'
            })
        }
        //Redirigir al usuario, consultar API
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    const leerValorRadio = e => {
        guardarCategoria(e.target.value);
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Editar Producto</h1>
            {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <form
                className="mt-5"
                onSubmit={editarProducto}
            >
                <div className="form-group">
                    <label>Nombre Producto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Producto"
                        ref={nombreProductoRef}
                        defaultValue={producto.nombreProducto}
                    />
                </div>

                <div className="form-group">
                    <label>Referencia Producto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="referencia" 
                        placeholder="Referencia Producto"
                        ref={referenciaProductoRef}
                        defaultValue={producto.referenciaProducto}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Producto (COP)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio" 
                        ref={precioProductoRef}
                        defaultValue={producto.precioProducto}
                    />
                </div>

                <div className="form-group">
                    <label>Peso Producto (g)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="peso" 
                        ref={pesoProductoRef}
                        defaultValue={producto.pesoProducto}
                    />
                </div>

                <div className="form-group">
                    <label>Stock Producto</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="stock" 
                        ref={stockProductoRef}
                        defaultValue={producto.stockProducto}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Enlatados"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Enlatados')}
                    />
                    <label className="form-check-label">
                        Enlatado
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Granos"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Granos')}
                    />
                    <label className="form-check-label">
                        Granos
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Frutas"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Frutas')}
                    />
                    <label className="form-check-label">
                        Frutas
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Verduras"
                        onChange={leerValorRadio}
                        defaultChecked={(producto.categoria === 'Verduras')}
                    />
                    <label className="form-check-label">
                        Verduras
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Editar Producto" />
            </form>
        </div>
    )
}

export default withRouter(EditarProducto);