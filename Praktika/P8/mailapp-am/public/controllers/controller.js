var mailapp = angular.module('mailapp', ['ngMaterial', 'ngAnimate', 'ngAria', 'ngMdIcons']);

var controllerFn = function($scope, $http, $mdDialog) {
    $scope.rename = "";
    // used to create a mail
    $scope.mail = {
        'sender' : '',
        'recipients' : '',
        'subject' : ''
    };
    // used to move a mail
    $scope.newFolder = '';

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

    $scope.openFolder = function(id) {
        $scope.edit(id);
        $scope.select(id);
    }

    $scope.edit = function(id){
        $http.get('/api/folder/' + id).success(function(data){
            console.log("ID: "+id);
            console.log("Datenlist: "+ data);
            $scope.folder = data;
            console.log("Opened " + $scope.folder);
        });
    };

    $scope.update = function($event, folder) {
        if ($event.which === 13) { // enter
            console.log($event);
            console.log("UPDATE: "+ folder + " to " + $scope.rename);
            $http.put('/api/folder/'+ $scope.rename, $scope.folder).
                success(function(data) {
                refresh();
            });
            $scope.rename = "";
        };
    };

    $scope.remove = function(id){
        console.log("remove: "+id);
        $http.delete('/api/folder/'+id).success(function(data){
            refresh();
        });
    };


    $scope.select = function(id) {
        console.log(id);
        $http.get('/api/msges/'+id).success(function(data){
            $scope.maillist=data;
        });
        $scope.selectedFolder = id;
    };

    $scope.movemsg = function(id, target){
        console.log("MSG Update: "+ target);
        $http.put('/api/msg/'+ id, { 'folder' : target}).success(function(data){
            console.log("Verschoben");
        });
    };

    $scope.msgdel=function(id){
        console.log(id);
        $http.delete('/api/msg/' + id).success(function(data){
            console.log("geloescht");
        });
    };

    $scope.toggle = function(id, event){
        if ($scope.msgId == id._id) {
            $scope.msgId = null;

        }
        else {
            $scope.msgId = id._id;
            $scope.message = id.text;;
            $scope.sender = id.sender;
            $scope.recipients = id.recipients;
            console.log($scope.msgId)
            console.log(id._id);

            $mdDialog.show({
                controller: DialogController,
                templateUrl: 'mail.html',
                parent: angular.element(document.body),
                targetEvent: event,
                scope: $scope,
                preserveScope: true
            })
            .then(function(action) {
                if (action === "delete") {
                    console.log("You want to delete " + $scope.msgId);
                    $scope.msgdel($scope.msgId);
                    console.log("Reloading " + $scope.selectedFolder);
                    $scope.openFolder($scope.selectedFolder);
                    $scope.newFolder = "";
                }
                else if (action === "move") {
                    console.log("You want to move " + $scope.msgId + " to " + $scope.newFolder);
                    $scope.movemsg($scope.msgId, $scope.newFolder);
                    console.log("Reloading " + $scope.selectedFolder);
                    $scope.openFolder($scope.selectedFolder);
                    $scope.newFolder = "";
                }
            }, function() {
                   $scope.newFolder = "";
                   console.log('You cancelled the dialog.'); // ESC
               });

            function DialogController($scope, $mdDialog) {
                $scope.hide = function() {
                    $mdDialog.hide();
                };
                $scope.cancel = function() {
                    $mdDialog.cancel();
                };
                $scope.answer = function(answer) {
                    $mdDialog.hide(answer);
                };
            }


        }
    }

    $scope.isSelected = function(mail) {
        console.log(mail._id === $scope.msgId);
        return mail._id === $scope.msgId;
    }

    $scope.create = function(){
        console.log($scope.mail);
        $scope.mail.folder = $scope.selectedFolder;
        $http.post('/api/msg/', $scope.mail).success(function(data) {
            console.log("Reloading " + $scope.selectedFolder);
            $scope.openFolder($scope.selectedFolder);
        });
    };


};

mailapp.controller('AppCtrl', ['$scope', '$http', '$mdDialog', controllerFn]);
