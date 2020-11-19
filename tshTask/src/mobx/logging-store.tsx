import {action, computed, observable} from 'mobx';
import {userLogin} from '../api/api-utils';
import {LoginAccess, LoginProps, User} from '../types';

export class LoggingStore {
  @observable token: string = '';
  @observable userName: User['username'] = '';
  @observable error: string = '';

  @action
  logIn = async ({username, password}: LoginProps) => {
    this.error = '';
    await userLogin({username, password})
      .then((res: LoginAccess) => {
        this.token = res.access_token;
        this.userName = res.username;
      })
      .catch((err: Error) => {
        this.token = '';
        this.userName = '';
        this.error = 'Bad credentials ' + '[ ' + err + ' ]';
      });
  };

  @action
  logOut = () => {
    this.token = '';
  };

  @action
  setError = (value: string) => {
    this.error = value;
  };

  @computed
  get isError() {
    return this.error !== '';
  }

  @computed
  get isLoggedIn() {
    return this.token !== '';
  }
}
