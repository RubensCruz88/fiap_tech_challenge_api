import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";

@Injectable()
export class ProfessorRoleGuard implements CanActivate {
    constructor() {}

    canActivate(context: ExecutionContext): boolean {
      const request = context.switchToHttp().getRequest();
      const user = request.user;

      if (!user || !['admin','professor'].includes(user.tipo)) {
        throw new ForbiddenException('Apenas professores tem permissão para executar essa ação');
      }

      return true;
    }
}