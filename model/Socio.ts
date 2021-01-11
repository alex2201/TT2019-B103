class Socio {
    apPaterno: string
    apMaterno: string
    nombre: string
    edad: number
    genero: string
    email: string
    passwd: string

    constructor(apPaterno: string,
        apMaterno: string,
        nombre: string,
        edad: number,
        genero: string,
        email: string,
        passwd: string,) {
            this.apPaterno = apPaterno
            this.apMaterno = apMaterno
            this.nombre = nombre
            this.edad = edad
            this.genero = genero
            this.email = email
            this.passwd = passwd
    }
}

export default Socio;