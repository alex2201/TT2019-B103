import Socio from "../model/Socio";

type GlobalsType = {
    socio: Socio | null,
    setSocio: ((socio: Socio | null) => void) | null
    goToMapa: (() => void) | null
}

var Globals: GlobalsType = {
    socio: null,
    setSocio: null,
    goToMapa: null,
};

export default Globals;