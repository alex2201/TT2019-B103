class Producto {
    idProducto:     string;
    idSubCat:       number;
    nombreSubCat:   string;
    marca:          string;
    nombre:         string;
    precioUnitario: number;
    valoracion: string;
    img: string | null;
    constructor(
        idProducto: string,
        nombre: string,
        precioUnitario: number,
        idSubCat: number,
        marca: string,
        nombreSubCat: string,
        valoracion: string,
        img: string | null
    ) {
        this.idProducto = idProducto;
        this.nombre = nombre;
        this.precioUnitario = precioUnitario;
        this.idSubCat = idSubCat;
        this.marca = marca;
        this.nombreSubCat = nombreSubCat;
        this.valoracion = valoracion;
        this.img = img
    }
};

export default Producto;