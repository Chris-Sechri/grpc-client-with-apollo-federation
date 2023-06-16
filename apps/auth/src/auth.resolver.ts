import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { Auth } from './entities/auth.entity';
import { CreateAuthInput } from './dto/create-auth.input';
import { UpdateAuthInput } from './dto/update-auth.input';
import { Inject, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthService } from "../../../../common/auth-rpc-service";
import { Observable } from 'rxjs';


@Resolver(() => Auth)
export class AuthResolver implements OnModuleInit {
  private authService: AuthService;

  constructor(@Inject('AUTH_STUB') private authStub: ClientGrpc) {}

  onModuleInit() {
      this.authService = this.authStub.getService<AuthService>("AuthService");
  }

  @Query(() => Auth, { name: 'findOne' })
  findOne(@Args('id', { type: () => Int }) id: number) : Observable<any> {
    try {
      return this.authService.findOne({id: 1});
    }catch(err) {
      console.log(err);
    }
    
  }

}
