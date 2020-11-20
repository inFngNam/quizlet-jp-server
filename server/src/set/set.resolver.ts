import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Set, SetInput, User } from 'src/graphql';
import { SetService } from './set.service';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/auth.guard';
import { CtxUser } from '../options/decorators/ctx-user.decorator';
import { TokenGuard } from 'src/auth/token.guard';

@Resolver()
export class SetResolver {
  constructor(private setService: SetService) {
  }

  @Query(() => Set)
  @UseGuards(TokenGuard, GqlAuthGuard)
  async set(@CtxUser() user: User,
    @Args('setId') setId: string): Promise<Set> {
    return await this.setService.getSetById(setId);
  }

  @Query(() => Set)
  @UseGuards(TokenGuard, GqlAuthGuard)
  async sets(@CtxUser() user: User): Promise<Set[]> {
    return await this.setService.getSetsByUserId(user);
  }

  @Mutation(() => Set)
  @UseGuards(TokenGuard, GqlAuthGuard)
  async createSet(@CtxUser() user: User,
    @Args('create') data: SetInput): Promise<Set> {
    return await this.setService.createSet(data, user);
  }

  @Mutation(() => Boolean)
  @UseGuards(TokenGuard, GqlAuthGuard)
  async deleteSet(@CtxUser() user: User,
    @Args('setId') setId: string): Promise<boolean> {
    return await this.setService.deleteSet(setId, user.id);
  }

  @Mutation(() => Set)
  @UseGuards(TokenGuard, GqlAuthGuard)
  async updateSet(@CtxUser() user: User,
    @Args('setId') setId: string,
    @Args('update') data: SetInput): Promise<Set> {
    return await this.setService.updateSet(setId, data, user);
  }
}