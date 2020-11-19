import {action, computed, observable} from 'mobx';
import {getUserInfo} from '../api/api-utils';
import {User} from '../types';

export class UserStore {
  @observable userData: User = {} as any;
  @observable loading: boolean = false;
  @observable error: string = '';

  @action
  fetchUserData = async (userName: string) => {
    this.loading = true;
    try {
      const userRes = await getUserInfo(userName);
      this.userData = userRes;
      this.loading = false;
    } catch (err) {
      this.loading = false;
      this.error = err;
    }
  };

  @computed
  get isError() {
    return this.error !== '';
  }
}
