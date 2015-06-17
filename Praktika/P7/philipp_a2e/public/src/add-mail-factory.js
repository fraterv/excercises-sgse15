import {$http} from 'xhr-factory';

export const AddMailFactory = {

  save: function(mail){
        return $http.post('/messages/msg/', mail);
  },
};
