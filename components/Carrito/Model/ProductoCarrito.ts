import Producto from "./Producto";

class ProductoCarrito {
    producto: Producto;
    cantidad: number;

    constructor(
        producto: Producto,
        cantidad: number
    ) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
};

export default ProductoCarrito;