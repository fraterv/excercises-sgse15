import {ComponentAnnotation as Component,
        ViewAnnotation as View,
        bootstrap, NgFor, NgIf, EventEmitter} from 'angular2/angular2';
import {FormBuilder, Validators, formDirectives, ControlGroup} from 'angular2/forms';
import {AddMailFactory} from 'add-mail-factory';

@Component({
    selector: 'add-mail',
    appInjector: [ FormBuilder ],
    properties: {},
    events: ['complete']
})
@View({
    templateUrl: "dist/addMail.html",
    directives: [NgIf, NgFor]
})
export class AddMail {
    complete = new EventEmitter();

    constructor() {
        this.recipient = null; //new Control("me");
        this.text = null;
        this.sender = null;
    }

    validateAndSaveMail() {
        this.complete.next("hi");
    }
}
