var AppCtrlFunc =
    function($scope, $ionicSideMenuDelegate, $ionicModal,
             $timeout, $state, $ionicHistory, Folders) {

    $scope.refresh = function() {
        Folders.getAll().success(function(data) {
            $scope.folders = data;
        });
    }

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function(e) {
        // Showing the left side menu on page enter or refresh
        console.log("Page refresh: Showing menu left");
        $ionicHistory.nextViewOptions({
            disableBack: true
        });
        $scope.refresh();
        //$ionicSideMenuDelegate.toggleLeft();
    });

    $scope.$on('updateFolderEvent', function(event, data) {
        console.log('UpdateFolderEvent received');
        $scope.refresh();
        $state.go($state.current, {}, {reload: true});
    });
};

var FolderCtrlFunc =
    // $stateParams provides access to the url/:parameter,
    // $ionicScrollDelegate is probably not needed,
    // $ionicModal is the directive for modal dialogs.
    function($scope, $rootScope, $stateParams, $ionicScrollDelegate,
             $ionicModal, $state, Folders, Mails) {

    $scope.folder = $stateParams.folderId;

    // Need this to have the newFolder visible in child scopes,
    // which use prototypical inheritance and therefore would
    // define their own newFolder if e.g. bound to ng-model.
    // See http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html
    $scope.inheritableScope = {
        newFolder: "", // move mail
        newFolderName: "", // rename folder
        newMailSubject: "",
        newMailSender: "",
        newMailText: "",
        newMailRecipient: ""
    };
    $scope.newMailText = "";

    $scope.deleteFolder = function() {
        console.log("Deleting folder " + $scope.folder);
        Folders.delete($scope.folder);
        $state.go('app.folders');
    }

    $scope.renameFolder = function() {
        if ($scope.inheritableScope.newFolderName !== "") {
            Folders.rename($scope.folder, $scope.inheritableScope.newFolderName);
            $scope.folder = $scope.inheritableScope.newFolderName;
            $rootScope.$broadcast('updateFolderEvent');
            $state.go('app.folders');
        }
    };

    Folders.getMailsFrom($scope.folder).success(function(data) {
        $scope.mails = data;
    });

    // Create the mailView modal
    $ionicModal.fromTemplateUrl('templates/mail.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.mailView = modal;
    });

    // Triggered in the mailView modal to close it
    $scope.closeMailView = function() {
        $scope.mail = $scope.mailIdx = null;
        $scope.mailView.hide();
    };

    // Open the login modal
    $scope.openMail = function($index) {
        console.log("Showing mail " + $index);
        $scope.mail = $scope.mails[$index];
        $scope.inheritableScope.newFolder = "";
        $scope.mailIdx = $index;
        $scope.mailView.show();
    };

    $scope.deleteMail = function() {
        console.log("Deleting current mail ");
        $scope.mails.splice($scope.mailIdx, 1);
        Mails.delete($scope.mail._id);
        $scope.closeMailView();
        $state.go('app.folders');
    };

    $scope.moveMail = function() {
        if ($scope.inheritableScope.newFolder != "") {
            console.log("Moving mail");
            Mails.move($scope.mail._id, $scope.inheritableScope.newFolder);
            $scope.mails.splice($scope.mailIdx, 1);
            $scope.closeMailView();
            $state.go('app.folders');
        }
    }


    // Create the modal to add a new mail
    $ionicModal.fromTemplateUrl('templates/mailNew.html', {
        scope: $scope
    }).then(function(modal) {
        $scope.mailNewView = modal;
    });


    $scope.addNewMail = function() {
        $scope.mailNewView.show();
    }

    $scope.createNewMail = function() {
        console.log("Text: " + $scope.newMailText);
        console.log("Sender: " + $scope.inheritableScope.newMailSender);
        Mails.create($scope.folder, $scope.inheritableScope.newMailSender,
                     $scope.inheritableScope.newMailRecipient,
                     $scope.inheritableScope.newMailSubject);

        $scope.closeNewMailView();
    }

    // Triggered in the mailNewView modal to close it
    $scope.closeNewMailView = function() {
        $scope.mailNewView.hide();
    };

};


angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', AppCtrlFunc)

.controller('FolderCtrl', FolderCtrlFunc);
