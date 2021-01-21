class Producto {
    idProducto:     string;
    idSubCat:       number;
    nombreSubCat:   string;
    marca:          string;
    nombre:         string;
    precioUnitario: number;
    valoracion: string;
    constructor(
        idProducto: string,
        nombre: string,
        precioUnitario: number,
        idSubCat: number,
        marca: string,
        nombreSubCat: string,
        valoracion: string
    ) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.idSubCat = idSubCat;
        this.marca = marca;
        this.nombreSubCat = nombreSubCat;
        this.valoracion = valoracion;
    }
};

export default Producto;