import Socio from "../model/Socio";
import Producto from "./Carrito/Model/Producto";

type GlobalsType = {
    socio: Socio | null,
    setSocio: ((socio: Socio | null) => void) | null
    goToMapa: (() => void) | null
    actualizarCarrito: ((item: Producto) => void) | null
}

var Globals: GlobalsType = {
    socio: null,
    setSocio: null,
    goToMapa: null,
    actualizarCarrito: null,
};

export default Globals;