var mailapp = angular.module('mailapp',[]);

var controllerFn = function($scope, $http) {

    var refresh = function(){
        $http.get('/api/folder').success(function(data){
            $scope.folderlist = data;
            $scope.folder="";
            $scope.rename="";
            console.log("Daten erhalten: "+data);
        })
        .error(function(data){
            console.log("Error: "+ data);
        });
    }

    refresh();

    $scope.edit = function(id){
        $http.get('/api/folder/' + id).success(function(data){
            console.log("ID: "+id);
            console.log("Datenlist: "+ data);
            $scope.folder = data;
        });
    };

    $scope.update = function(){
        console.log("UPDATE: "+ $scope.folder.folder +" "+ $scope.rename);
        $http.put('/api/folder/'+ $scope.rename, $scope.folder).success(function(data){
            refresh();
        });
    };

    $scope.remove = function(id){
        console.log("remove: "+id);
        $http.delete('/api/folder/'+id).success(function(data){
            refresh();
        });
    };


    $scope.select =function(id){
        console.log(id);
        $http.get('/api/msges/'+id).success(function(data){
            $scope.maillist=data;
        });
    };

    $scope.move = function(id){
        console.log("MV ID"+id._id);
        console.log("MV ID"+id.folder);
        $scope.mv = id;
    };

    $scope.movemsg = function(){
        console.log("MSG Update: "+ $scope.mv._id);
        $http.put('/api/msg/'+ $scope.mv._id, $scope.mv).success(function(data){
            console.log("Verschoben");
            $scope.mv="";
        });
    };

    $scope.msgdel=function(id){
        console.log(id._id);
        console.log();
        $http.delete('/api/msg/'+id._id).success(function(data){
            console.log("geloescht");
        });
    };

    $scope.show = function(id){
        $scope.message=id.text;;
    };

    $scope.create = function(){
        console.log($scope.mails);
        //$http.post('/msg',$scope.mail).success(function(data){

        //});
    };


};



mailapp.controller('AppCtrl', ['$scope', '$http', controllerFn]);
