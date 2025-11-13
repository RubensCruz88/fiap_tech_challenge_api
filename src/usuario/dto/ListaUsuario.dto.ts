import { UserRole } from "../usuario.entity";

export class ListaUsuarioDTO {
	constructor(
		readonly id: string,
		readonly nome: string,
		readonly email: string,
		readonly tipo: UserRole,
		readonly createdAt: Date,
		readonly updatedAt: Date
	) {}
}