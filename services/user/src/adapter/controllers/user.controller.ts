import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { UserUseCase } from '@/domain';
import { PaginationOptions, ReqParams, ReqQuery } from '@/common';
import { UserDto } from '../dto';
import { NotFoundException } from '../exception';

@singleton()
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async index(
    req: Request<any, any, any, IndexReqQuery>,
    res: Response,
  ): Promise<any> {
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
    const { userId } = req.params;
    const user = await this.userUseCase.getDetail(userId);

    if (!user) {
      throw new NotFoundException();
    }

    return res.json({
      data: UserDto.fromDomain(user),
    });
  }
}

type IndexReqQuery = ReqQuery<PaginationOptions>;
type ShowReqParams = ReqParams<{ userId: string }>;
