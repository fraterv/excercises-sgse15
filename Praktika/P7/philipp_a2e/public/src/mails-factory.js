import {$http} from 'xhr-factory';

export const MailsFactory = {

/*
  getAll :function(){
        return $http.get('/mails/folders');
  },

  get:function(id){
        return $http.get('/mails/folders/'+id);
  },

  save: function(todo){
        return $http.post('/api/v1/todo', todo);
  },
*/
  updateFolder: function(id, folder){
        return $http.put('/messages/msg/' + id + "?folder=" + folder);
  },

  delete: function(id) {
        return $http.delete('/messages/msg/' + id);
  }

};
