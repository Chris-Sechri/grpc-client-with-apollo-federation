import { ApolloFederationDriver, ApolloFederationDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { AuthResolver } from './auth.resolver';
import { LocalStrategy } from './strategies/local-strategy';


@Module({
  imports: [
    ConfigModule,
    PassportModule,
    GraphQLModule.forRoot<ApolloFederationDriverConfig>({
      driver: ApolloFederationDriver,
      autoSchemaFile: {
        federation: 2
      }
    }),
  ],
  providers: [
    {
      provide: 'AUTH_STUB',
      useFactory: (serviceConfig: ConfigService): ClientProxyFactory => {
        return ClientProxyFactory.create({
          transport: Transport.GRPC,
          options: {
            package: 'auth',
            url: "localhost:65006",
            protoPath: join(process.cwd(), '../_proto/auth.proto')
          } 
        })
      },
      inject: [ConfigService]
    },
    AuthResolver,
    LocalStrategy
  ],
})
export class AuthModule {}
