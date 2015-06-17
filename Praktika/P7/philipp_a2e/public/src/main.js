import {ComponentAnnotation as Component,
        ViewAnnotation as View,
        bootstrap, NgIf, NgFor} from 'angular2/angular2';

import {$http} from 'xhr-factory';
import {Folder} from 'folder';
import {FoldersFactory} from 'folders-factory';


class FoldersWrapper {
    constructor(name) {
        this.name = name;
        this.isEditMode = false;
    }
}

@Component({
  selector: 'main',
  services: [FoldersFactory]
})
@View({
  templateUrl: 'dist/main.html',
  directives : [NgFor, Folder]
})

export class Main {

    folders: Array;

    constructor() {
        console.log("Constructing Main");
        this.folders = [];
        this.showingMails = false;

        FoldersFactory.getAll().then((data) =>{
            for (var f in data) {
                this.folders.push(new FoldersWrapper(data[f]));
            }
            //this.folders = data;
            console.log("Init with " + this.folders.length + " folders")
            console.log(this.folders);
        });
    }

    /*
addFolder($event, folderName) {
console.log("Add folder " + folderName.value)
if($event.which === 13) {
var folder = new Folder(folderName.value);

console.log("Saving folder " + folder.name);

FoldersFactory.save(_folder).then((data)=>{
// keep things in sync
this.folders.push(data);
folderName.value = '';
})
}
}
     */

    updateFolderName($event, folder){
        var oldname = folder.name
        if($event.which === 13) {
            folder.name = $event.target.value;

            FoldersFactory.update(oldname, folder.name).then((data)=> {
                // console.log(data); -> {ok: true, n: 1, updatedExisting: true}
                // wait for the response before resetting the state
                this.setEditState(folder, false);
            });
        }
    }

    updateStatus(folder) {
        var _todo = {
            _id : todo._id,
            text : todo.name,
            isCompleted : !folder.isCompleted
        };

        FoldersFactory.update(_folder).then((data)=> {
            console.log("Updated: " + data); //-> {ok: true, n: 1, updatedExisting: true}
            // wait for the response before updating the UI
            folder.isCompleted = !folder.isCompleted;
        });

    }

    deleteFolder(folder) {
        var folders = this.folders;

        FoldersFactory.delete(folder.name).then((data)=> {
            console.log("Deleted: " + data.message);
            if (data.message === "Successfully deleted") { // ??
                for (var i = 0; i < folders.length; i++) {
                    if (folders[i].name == folder.name) {
                        folders.splice(i, 1);
                    }
                };
            }
        });
    }

    setEditState(folder, state) {
        if (state) {
            folder.isEditMode = state;
        } else {
            // don't store unwanted presentation logic in DB :/
            delete folder.isEditMode;
        }
    }

    openFolder(folder) {
        this.loading = true;
        setTimeout(() => {
            FoldersFactory.get(folder.name).then((data) => {
                this.mails = data;
                console.log(this.mails);
                this.loading = false;
            })
        }, 1000);
    }
}

bootstrap(Main);
