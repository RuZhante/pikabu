import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsDefined, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsEmailAlreadyExist } from '../validation/customCreateEmail.validation';
import { IsUsernameAlreadyExist } from '../validation/customCreateUsername.validation';

@InputType()
export class CreateUserDto {
  @IsUsernameAlreadyExist({
    message: 'Username already exists. Choose another username.',
  })
  @Field(() => String, { description: 'Username of the user' })
  @IsNotEmpty()
  @IsString()
  readonly username: string;

  @IsEmailAlreadyExist({
    message: 'Email already exists. Choose another email.',
  })
  @ApiProperty()
  @IsDefined()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Field(() => String, { description: 'Email of the user' })
  email: string;

  @IsNotEmpty()
  @IsString()
  @Field(() => String, { description: 'Password of the user' })
  password: string;
}
