import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { User, UserUseCase } from '@/domain';
import { PaginationOptions, PolicyAction, ReqParams, ReqQuery } from '@/common';
import { UserDto } from '../dto';
import { NotFoundException, UnauthorizedException } from '../exception';

@singleton()
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async index(
    req: Request<any, any, any, IndexReqQuery>,
    res: Response,
  ): Promise<any> {
    const { ability } = req.ctx;

    if (ability!.cannot(PolicyAction.ViewAny, User)) {
      throw new UnauthorizedException();
    }

    const { limit, page } = req.query;
    const { total, data } = await this.userUseCase.getPagination({
      limit,
      page,
    });

    return res.json({
      total,
      data: data.map(UserDto.fromDomain),
    });
  }

  async show(req: Request<ShowReqParams>, res: Response): Promise<any> {
    const { ability } = req.ctx;
    const { userId } = req.params;
    const user = await this.userUseCase.getDetail(userId);

    if (!user) {
      throw new NotFoundException();
    }

    if (ability!.cannot(PolicyAction.View, user)) {
      throw new UnauthorizedException();
    }

    return res.json({
      data: UserDto.fromDomain(user),
    });
  }

  async create(
    req: Request<any, any, CreateReqBody>,
    res: Response,
  ): Promise<any> {
    const { ability } = req.ctx;

    if (ability!.cannot(PolicyAction.Create, User)) {
      throw new UnauthorizedException();
    }

    const { username, password } = req.body;
    const newUser = await this.userUseCase.create({ username, password });

    return res.json({
      data: UserDto.fromDomain(newUser),
    });
  }

  async update(
    req: Request<ShowReqParams, any, CreateReqBody>,
    res: Response,
  ): Promise<any> {
    const { ability } = req.ctx;
    const { userId } = req.params;
    const { username, password } = req.body;
    const user = await this.userUseCase.getDetail(userId);

    if (!user) {
      throw new NotFoundException();
    }

    if (ability!.cannot(PolicyAction.Update, user)) {
      throw new UnauthorizedException();
    }

    const updatedUser = await this.userUseCase.update(user, {
      username,
      password,
    });

    return res.json({
      data: UserDto.fromDomain(updatedUser),
    });
  }

  async delete(req: Request<ShowReqParams>, res: Response): Promise<any> {
    const { ability } = req.ctx;
    const { userId } = req.params;
    const user = await this.userUseCase.getDetail(userId);

    if (!user) {
      throw new NotFoundException();
    }

    if (ability!.cannot(PolicyAction.Delete, user)) {
      throw new UnauthorizedException();
    }

    await this.userUseCase.delete(user);

    return res.json({
      data: UserDto.fromDomain(user),
    });
  }
}

type IndexReqQuery = ReqQuery<PaginationOptions>;
type ShowReqParams = ReqParams<{ userId: string }>;
interface CreateReqBody {
  username: string;
  password: string;
}
