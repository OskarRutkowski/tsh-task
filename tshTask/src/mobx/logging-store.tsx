import {action, computed, observable} from 'mobx';
import {userLogin} from '../api/api-utils';
import {LoginAccess, LoginProps, User} from '../types';

export class LoggingStore {
  @observable token: string = '';
  @observable loading: boolean = false;
  @observable userName: User['username'] = '';
  @observable error: string = '';

  @action
  logIn = async ({username, password}: LoginProps) => {
    this.error = '';
    this.loading = true;
    try {
      const loginRes: LoginAccess = await userLogin({username, password});
      this.token = loginRes.access_token;
      this.userName = loginRes.username;
      this.loading = false;
    } catch (err) {
      this.token = '';
      this.userName = '';
      this.loading = false;
      this.error = err.message;
    }
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
  get isLoggedIn() {
    return this.token !== '';
  }
}
