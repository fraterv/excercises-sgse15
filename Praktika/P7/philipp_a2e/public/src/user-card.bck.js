import {ComponentAnnotation as Component,
        ViewAnnotation as View,
        bootstrap, NgFor, NgIf} from 'angular2/angular2';
import {bind} from 'angular2/di';

@Component({
  selector: 'user-card',
  bind: {
    user: 'user',
    loading: 'loading'
  }
})
@View({
  template: `
    <div class="user-card">
      <div [hidden]="!loading">
        Not loading
<!--        <content select="[loading]"></content> -->
      </div>
      <div [hidden]="loading">
        <div [hidden]="user" class="no-user">
          No user
<!--          <content select="[no-user]"></content>-->
        </div>
        <div *if="user">
          Hi
          <div class="user-properties">
            <div *for="#prop of properties">
              <strong>{{prop.title}}:</strong> {{prop.getVal(user)}}
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  directives: [NgIf, NgFor]
})
export class UserCard {
  constructor() {
    this.properties = [
      {
        title: 'Name',
        getVal: user => console.log(user)
      }
    ];

    function upperWords(string) {
      return string.split(' ').map(word => {
        return word.substr(0, 1).toUpperCase() + word.substr(1);
      }).join(' ');
    }
  }
}
