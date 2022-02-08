import { Injectable } from '@nestjs/common';
import DataLoader from 'dataloader';
import { IDataLoaders } from './interfaces/dataloaders';
import { UserService } from 'modules/user/user.service';

@Injectable()
export class DataloaderService {
  constructor(private readonly userService: UserService) {}

  createLoaders(): IDataLoaders {
    const userByIdLoader = new DataLoader((keys: readonly string[]) =>
      this.userService.loadUsersByIdBatch(keys as string[]),
    );

    return {
      userByIdLoader,
    };
  }
}
