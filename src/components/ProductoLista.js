import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

function ProductoLista({ producto, guardarRecargarProductos }) {
  const venderProducto = (id) => {
    //TODO: Vender producto
    if (producto.stockProducto >= 1) {
      const editarStock = {
        stockProducto: producto.stockProducto - 1,
        precioProducto: producto.precioProducto,
        nombreProducto: producto.nombreProducto,
        pesoProducto: producto.pesoProducto,
        referenciaProducto: producto.referenciaProducto,
        fechaModificacion: producto.fechaModificacion,
        categoria: producto.categoria,
      };

      Swal.fire({
        title: "¿Estás seguro?",
        text: "¡Es una accion irreversible!",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "¡Si!",
      }).then(async (result) => {
        if (result.value) {
          try {
            const url = `http://localhost:4000/Inventario/${id}`;
            const resultado = await axios.put(url, editarStock);
            if (resultado.status === 200) {
              Swal.fire(
                "¡Vendido!",
                "¡El producto fue vendido correctamente!",
                "success"
              );
              //Consultar la API nuevamente
              guardarRecargarProductos(true);
            }
          } catch (error) {
            console.log(error);
            Swal.fire({
              type: "error",
              title: "Error",
              text: "Hubo un error, vuelva a intentarlo.",
            });
          }
        }
      });
    } else {
      Swal.fire({
        type: "warning",
        title: "Out of stock",
        text: "Esta venta no es posible.",
      });
    }
  };

  const eliminarProducto = (id) => {
    console.log("Eliminando: ", id);
    //TODO: Eliminar los registros
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Es una accion irreversible!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "¡Si, eliminalo!",
    }).then(async (result) => {
      if (result.value) {
        try {
          const url = `http://localhost:4000/Inventario/${id}`;
          const resulltado = await axios.delete(url);
          if (resulltado.status === 200) {
            Swal.fire("¡Eliminado!", "¡El producto fue eliminado!", "success");
            //Consultar la API nuevamente
            guardarRecargarProductos(true);
          }
        } catch (error) {
          console.log(error);
          Swal.fire({
            type: "error",
            title: "Error",
            text: "Hubo un error, vuelva a intentarlo.",
          });
        }
      }
    });
  };
  return (
    <li
      data-categoria={producto.categoria}
      className="list-group-item d-flex justify-content-between align-weight-bold"
    >
      <h4>
        {producto.nombreProducto} {"  "}
      </h4>
      <p>
        <span className="font-weight-bold">
          {producto.stockProducto} unidades en stock
        </span>
      </p>
      <p>
        Precio de venta:
        <span className="font-weight-bold"> ${producto.precioProducto}</span>
      </p>

      <button
        type="button"
        className="btn btn-info"
        onClick={() => venderProducto(producto.id)}
      >
        Vender
      </button>

      <div>
        <Link
          to={`/productos/editar/${producto.id}`}
          className="btn btn-success mr-2"
        >
          Editar
        </Link>
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => eliminarProducto(producto.id)}
        >
          Eliminar &times;
        </button>
      </div>
    </li>
  );
}

export default ProductoLista;
