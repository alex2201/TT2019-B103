class Socio {
    apPaterno: string
    apMaterno: string
    nombre: string
    edad: number
    genero: string
    email: string
    passwd: string
    idSocio: string

    constructor(apPaterno: string,
        apMaterno: string,
        nombre: string,
        edad: number,
        genero: string,
        email: string,
        passwd: string,
        idSocio: string) {
            this.apPaterno = apPaterno
            this.apMaterno = apMaterno
            this.nombre = nombre
            this.edad = edad
            this.genero = genero
            this.email = email
            this.passwd = passwd
            this.idSocio = idSocio
    }
}

export default Socio;