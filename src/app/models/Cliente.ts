import { Seguro } from "./Seguro";

export class Cliente {
    cedulaCliente?: string;
    nombreCliente?: string
    telefono?: string
    edad: number = 0
    clientesSeguros?: ClientesSeguros[] = []
}

export class ClientesSeguros {
    codigoSeguro?: string;
    cedulaCliente?: string;
    //cliente?: Cliente;
    // seguro?: Seguro;
    fechaAlta?: Date;
}