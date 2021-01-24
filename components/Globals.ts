import Socio from "../model/Socio";
import Producto from "./Carrito/Model/Producto";
import { sha256 } from 'js-sha256';

type GlobalsType = {
    socio: Socio | null,
    setSocio: ((socio: Socio | null) => void) | null
    goToMapa: (() => void) | null
    actualizarCarrito: ((item: Producto) => void) | null,
    hashFunc: (message: string) => string
}

var Globals: GlobalsType = {
    socio: null,
    setSocio: null,
    goToMapa: null,
    actualizarCarrito: null,
    hashFunc: (x) => sha256(x),
};

export default Globals;