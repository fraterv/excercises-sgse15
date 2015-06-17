import {ComponentAnnotation as Component,
        ViewAnnotation as View,
        bootstrap, NgIf} from 'angular2/angular2';
import {UserCard} from 'user-card';
//import {axios} from './lib/axios';
import {$http} from 'xhr-factory';
//import {RandomUser} from 'RandomUser';

class Folders {
  getFolders() {
    //var url = 'http://api.randomuser.me';
    //var url = 'http://localhost:3000'; // just in case there's no internet...
    console.log("Getting folders");
    var url = '/mails/folders';
    return $http.get(url).then(response => console.log(response));
  }
  getFolder(folder) {
    //var url = 'http://api.randomuser.me';
    //var url = 'http://localhost:3000'; // just in case there's no internet...
    var url = '/mails/folders/' + folder;
    return $http.get(url).then(response => console.log(response));
  }
}

var folders = new Folders();
@Component({
  selector: 'main',
  services: [Folders]
})
@View({
  template: `
    <!--
    <div class="new-user-button">
      <button class="ru-button --primary" autofocus (click)="getAllFolders()">
        <i class="fa fa-user"></i>
        {{buttonText}}
      </button>
    </div>
    <user-card [user]="user" [loading]="loading">
      <div loading>
        <i class="fa fa-refresh fa-2x fa-spin"></i>
      </div>
      <div no-user>
        <small>please click on "{{buttonText}}"</small>
      </div>
    </user-card>
    -->

    <user-card [user]="user" [loading]="loading">
    </user-card>
  `,
  directives: [UserCard]
})

export class App {
  constructor() {
    this.buttonText = 'Get Folder';
    this.getFolders = folders.getFolders;
    this.loading = true;
    this.getAllFolders()
  }

  getAllFolders() {
    setTimeout(() => {
        console.log("Timeout");
        this.buttonText = "Thanks";
        this.getFolders().then(folder => {
            console.log("Got folder");
            this.user = folder;
            this.loading = false;
        }).catch(() => this.loading = false);
    }, 1000);
  }
}

bootstrap(App);
