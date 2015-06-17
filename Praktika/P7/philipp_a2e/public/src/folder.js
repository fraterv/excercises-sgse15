import {ComponentAnnotation as Component,
        ViewAnnotation as View,
        bootstrap, NgFor, NgIf} from 'angular2/angular2';
import {MailsFactory} from 'mails-factory';
//import {AddMail} from 'addMail';

@Component({
  selector: 'folder-view',
/*
  bind: {
      mails: 'mails',
      loading: 'loading'
  }
*/
  properties: {'mails':'mails', 'loading' : 'loading'}
})

@View({
  templateUrl: "dist/folder.html",
  directives: [NgIf, NgFor]
})

export class Folder {

    constructor() {
    }

    openCloseMail(mail) {
        if (mail.selected) {
            delete mail.selected;
        }
        else {
            mail.selected = true;
        }
    }

    deleteMail(mail) {
        if (mail.selected) {
            delete mail.selected;
        }
        MailsFactory.delete(mail._id).then((data) => {
            if (data.ok == 1 && data.n == 1) {
                this.removeMailFromCurrentView(mail);
            };
        });
    }

    moveMail($event, mail) {
        var folder = null;
        if($event.which === 13) { // enter
            if (mail.selected) {
                delete mail.selected;
            }
            folder = $event.target.value;
        }
        if (folder) {
            MailsFactory.updateFolder(mail._id, folder).then((data) => {
                for (var d in data) {
                    console.log(d + ": " + data[d]);
                }
                this.removeMailFromCurrentView(mail);
            });
        }
    }

    removeMailFromCurrentView(mail) {
        for (var i = 0; i < this.mails.length; i++) {
            if (this.mails[i]._id == mail._id) {
                this.mails.splice(i, 1);
            }
        };
    }

    stateComposingMail() {
        if (this.composingMail) {
            this.composingMail = false;
        }
        else {
            this.composingMail = true;
        }
    }

    backToFolders() {
        location.reload();
    }

    addMail(value) {
        console.log("Adding mail " + value);
    }
}
