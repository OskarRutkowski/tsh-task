import {action, observable} from 'mobx';
import {getUserInfo} from '../api/api-utils';
import {User} from '../types';

export class UserStore {
  @observable userData: User = {} as any;
  @observable loading: boolean = false;

  @action
  fetchUserData = async (userName: string) => {
    this.loading = true;
    try {
      const userRes = await getUserInfo(userName);
      this.userData = userRes;
      this.loading = false;
    } catch (err) {
      console.log(err);
      this.loading = false;
    }
  };
}
