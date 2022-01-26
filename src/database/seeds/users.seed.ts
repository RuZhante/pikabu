import { PostEntity } from 'src/post/post.entity';
import { UserEntity } from 'src/user/user.entity';
import { Connection } from 'typeorm';
import { Factory, Seeder } from 'typeorm-seeding';

export default class CreateUsers implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    await connection
      .createQueryBuilder()
      .insert()
      .into(UserEntity)
      .values([
        { username: 'Max', email: 'max@email.com', password: '123' },
        { username: 'Jone', email: 'jone@email.com', password: '123' },
        { username: 'Bill', email: 'bill@email.com', password: '123' },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values([
        {
          title: 'Post 1',
          description: 'Description 1',
          image: 'post1.png',
          userId: 1,
        },
        {
          title: 'Post 2',
          description: 'Description 2',
          image: 'post2.png',
          userId: 2,
        },
        {
          title: 'Post 3',
          description: 'Description 3',
          image: 'post3.png',
          userId: 3,
        },
      ])
      .execute();
  }
}
