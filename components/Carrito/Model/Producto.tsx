class Producto {
    idProducto: string;
    nombre: string;
    marca: string;
    cantidad: number;
    precioUnitario: number;
    idSubCat: number;

    constructor(
        idProducto: string,
        nombre: string,
        cantidad: number,
        precioUnitario: number,
        idSubCat: number,
        marca: string
    ) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.cantidad = cantidad;
        this.precioUnitario = precioUnitario;
        this.idSubCat = idSubCat;
        this.marca = marca;
    }
};

export default Producto;