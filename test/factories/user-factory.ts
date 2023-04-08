import { User, UserProps } from '@/app/entities/user';

type Override = Partial<UserProps>;

export function makeUser(override: Override = {}) {
  return new User({
    email: 'ac@wokde.mu',
    name: 'Carolyn Delgado',
    username: 'bl74F',
    ...override,
  });
}
