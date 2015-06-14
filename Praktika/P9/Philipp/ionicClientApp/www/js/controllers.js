var AppCtrlFunc =
    function($scope, $ionicSideMenuDelegate, $ionicModal,
             $timeout, Folders) {

    Folders.getAll().success(function(data) {
        $scope.folders = data;
    });

    // With the new view caching in Ionic, Controllers are only called
    // when they are recreated or on app start, instead of every page change.
    // To listen for when this page is active (for example, to refresh data),
    // listen for the $ionicView.enter event:
    $scope.$on('$ionicView.enter', function(e) {
        // Showing the left side menu on page enter or refresh
        console.log("Page refresh: Showing menu left");
        $ionicSideMenuDelegate.toggleLeft();
    });
};

var FolderCtrlFunc =
    // $stateParams provides access to the url/:parameter,
    // $ionicScrollDelegate is probably not needed,
    // $ionicModal is the directive for modal dialogs.
    function($scope, $stateParams, $ionicScrollDelegate,
             $ionicModal, Folders, Mails) {

    $scope.folder = $stateParams.folderId;
    // Need this to have the newFolder visible in child scopes,
    // which use prototypical inheritance and therefore would
    // define their own newFolder if e.g. bound to ng-model.
    // See http://jimhoskins.com/2012/12/14/nested-scopes-in-angularjs.html
    $scope.mailScope = {
        newFolder: ""
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
        $scope.mailScope.newFolder = "";
        $scope.mailIdx = $index;
        $scope.mailView.show();
    };

    $scope.deleteMail = function() {
        console.log("Deleting current mail ");
        $scope.mails.splice($scope.mailIdx, 1);
        Mails.delete($scope.mail._id);
        $scope.closeMailView();
    };

    $scope.moveMail = function() {
        if ($scope.mailScope.newFolder != "") {
            console.log("Moving mail");
            Mails.move($scope.mail._id, $scope.mailScope.newFolder);
            $scope.mails.splice($scope.mailIdx, 1);
            $scope.closeMailView();
        }
    }
};


angular.module('starter.controllers', ['starter.services'])

.controller('AppCtrl', AppCtrlFunc)

.controller('FolderCtrl', FolderCtrlFunc);
