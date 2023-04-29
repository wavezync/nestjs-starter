import { Model } from 'objection';
import { v4 as uuid } from 'uuid';
import { UserDto } from '../dtos/user.dto';

// Since we created and imported DatabaseModule now every Model has access to
// the Knex instance Read more: https://vincit.github.io/objection.js/guide/getting-started.html
export class User extends Model {
  // define table name
  // check https://vincit.github.io/objection.js/guide/models.html
  static tableName = 'users';

  id!: string;
  email!: string;

  // this is password_hash in db
  // it is better to use PostgreSQL convention(snake_case) in DB
  // and JS convention(camelCase) in application level
  // Read More https://vincit.github.io/objection.js/recipes/snake-case-to-camel-case-conversion.html
  passwordHash: string;
  createdAt!: Date;
  updatedAt!: Date;
  verified!: boolean;

  // on create uuid and createdAt timestamp
  $beforeInsert() {
    const now = new Date();
    this.id = uuid();
    this.createdAt = now;
    this.updatedAt = now;
    if (this.email) this.email = this.email.toLowerCase();
  }

  // on update queries also set the timestamp
  $beforeUpdate() {
    this.updatedAt = new Date();

    if (this.email) this.email = this.email.toLowerCase();
  }

  toDto(): UserDto {
    return {
      id: this.id,
      email: this.email,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      verified: this.verified,
    };
  }
}
