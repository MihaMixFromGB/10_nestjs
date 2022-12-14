import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class ProfilesGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.user;
    const { id: profileUserId } = request.params;

    return userId === parseInt(profileUserId);
  }
}
