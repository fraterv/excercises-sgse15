import {$http} from 'xhr-factory';

export const FoldersFactory = {

  getAll :function(){
        return $http.get('/mails/folders');
  },

  get:function(id){
        return $http.get('/mails/folders/'+id);
  },

  save: function(todo){
        return $http.post('/api/v1/todo', todo);
  },

  update: function(oldname, newname){
        return $http.put('/mails/folders/' + oldname + "?name=" + newname);
  },

  delete: function(folder) {
        return $http.delete('/mails/folders/' + folder);
  }

};
