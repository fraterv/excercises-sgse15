angular.module('starter.services', []).factory('Folders', ['$http', function($http) {
    return {
        getAll:function() {
            return $http.get('http://localhost:3000/api/mails');
        },
        getMailsFrom:function(id){
            return $http.get('http://localhost:3000/api/mails/'+id);
        },
        edit:function(id,newname){
            var query = id + "?folder=" + newname;
            return $http.put('http://localhost:3000/api/mails/'+query);
        },
        delete:function(id){
            return $http.delete('http://localhost:3000/api/mails/' + id);
        }
    }
}]);
