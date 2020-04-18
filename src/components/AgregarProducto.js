import React, {useState} from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import Error from './Error';
import {withRouter} from 'react-router-dom';


function AgregarProducto({history, guardarRecargarProductos}) {
    //state
    const [nombreProducto, guardarNombre] = useState('');
    const [precioProducto, guardarPrecio] = useState('');
    const [categoria, guardarCategoria] = useState('');
    const [error, guardarError] = useState(false);

    const leerValorRadio = e => {
        guardarCategoria(e.target.value);
    }

    const agregarProducto = async e => {
        e.preventDefault();
        if(nombreProducto === '' || precioProducto === '' || categoria === ''){
            guardarError(true);
            return;
        }
        guardarError(false);
        //Crear el nuevo producto
        try {
            const resultado = await axios.post('http://localhost:4000/Inventario', {
                nombreProducto,
                precioProducto,
                categoria
            });
            if(resultado.status === 201) {
                Swal.fire(
                    '¡Producto creado!',
                    '¡El producto fue creado correctamente!',
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
        //Redigirir al usuario a productos
        guardarRecargarProductos(true);
        history.push('/productos');
    }

    return (
        <div className="col-md-8 mx-auto ">
            <h1 className="text-center">Agregar Nuevo Producto</h1>
            {(error) ? <Error mensaje="Todos los campos son obligatorios" /> : null}
            <form
                className="mt-5"
                onSubmit={agregarProducto}
            >
                <div className="form-group">
                    <label>Nombre Producto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="nombre" 
                        placeholder="Nombre Producto"
                        onChange={e => guardarNombre(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Referencia Producto</label>
                    <input 
                        type="text" 
                        className="form-control" 
                        name="referencia" 
                        placeholder="Referencia"
                        onChange={e => guardarReferencia(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Precio Producto</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        name="precio"
                        minValue={0}
                        placeholder="Precio Producto"
                        onInput={e => guardarPrecio(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Peso Producto (g)</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        minValue={0}
                        name="peso" 
                        onInput={e => guardarPeso(e.target.value)}
                    />
                </div>

                <div className="form-group">
                    <label>Stock Producto</label>
                    <input 
                        type="number" 
                        className="form-control" 
                        minValue={0}
                        name="stock" 
                        onInput={e => guardarStock(e.target.value)}
                    />
                </div>

                <legend className="text-center">Categoría:</legend>
                <div className="text-center">
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Postres"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Postre
                    </label>
                </div>
                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Bebida"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Bebida
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Cortes"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Cortes
                    </label>
                </div>

                <div className="form-check form-check-inline">
                    <input 
                        className="form-check-input" 
                        type="radio" 
                        name="categoria"
                        value="Ensalada"
                        onChange={leerValorRadio}
                    />
                    <label className="form-check-label">
                        Ensalada
                    </label>
                </div>
                </div>

                <input type="submit" className="font-weight-bold text-uppercase mt-5 btn btn-primary btn-block py-3" value="Agregar Producto" />
            </form>
        </div>
    )
}

export default withRouter(AgregarProducto);