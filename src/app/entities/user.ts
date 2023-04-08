import { randomUUID as uuid } from 'node:crypto';

export interface UserProps {
  name: string;
  username: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export class User {
  private props: UserProps;

  private _id: string;

  private _password: string;

  constructor(props: UserProps, id?: string) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
    };
    this._id = id ?? uuid();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get username() {
    return this.props.username;
  }

  set username(username: string) {
    this.props.username = username;
  }

  get email() {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password() {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }

  get createdAt() {
    return this.props.createdAt;
  }

  get updatedAt() {
    return this.props.updatedAt;
  }
}
