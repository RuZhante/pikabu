import { UserEntity } from 'src/user/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

type UserSeed = {
  username: string;
  email: string;
  password: string;
};

const defaultUsers: Record<string, UserSeed> = {
  user: {
    username: 'Jone',
    email: 'jone@email.com',
    password: '123',
  },
  user2: {
    username: 'Max',
    email: 'max@email.com',
    password: '123',
  },
};

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const usersSeeder = factory(UserEntity)();

    // async function createUsers(user: UserSeed): Promise<void> {
    //   const userCreated = await usersSeeder.create({
    //     username: user.username,
    //     email: user.email,
    //     password: user.password,
    //   });
    // }

    const usersPromises = Object.entries(defaultUsers).map(
      async ([countUser, userData]) => {
        const userCreated = await usersSeeder.create({
          username: userData.username,
          email: userData.email,
          password: userData.password,
        });
      },
    );

    await Promise.all(usersPromises);
  }
}
