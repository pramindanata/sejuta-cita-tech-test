import { Request, Response } from 'express';
import { singleton } from 'tsyringe';
import { UserUseCase } from '@/domain';
import { PaginationOptions, ReqQuery } from '@/common';
import { UserDto } from '../dto';

@singleton()
export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async index(
    req: Request<any, any, any, IndexQueryReq>,
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
}

type IndexQueryReq = ReqQuery<PaginationOptions>;
