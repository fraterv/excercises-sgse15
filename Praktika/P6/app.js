var app = angular.module('app', [
    'ngRoute'
]);



//AUFGABE START
//ToDo Aufgabe 1: aufgabe2.html und aufgabe3.html routen
//ToDo Aufgabe 2: aufgabe2.html so routen, dass zus�tzlich Route-Parameter �bergeben werden k�nnen

app.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
            when('/aufgabe1', {
                templateUrl: 'view/aufgabe1.html',
                controller: 'TaskCtrl'
            }).
            when('/aufgabe2/', {
                templateUrl: 'view/aufgabe2.html',
                controller: 'TaskCtrl'
            }).
            when('/aufgabe2/:taskId', {
                templateUrl: 'view/aufgabe2.html',
                controller: 'TaskCtrl'
            }).
            when('/aufgabe3', {
                templateUrl: 'view/aufgabe3.html',
                controller: 'TaskCtrl'
            }).
            otherwise({
                redirectTo: '/aufgabe1'
            });
    }]);

//AUFGABE ENDE



app.controller('TaskCtrl', ['$scope', '$routeParams',
    function($scope, $routeParams) {
        $scope.taskId = $routeParams.taskId;

        $scope.hasTaskId = function(){
            if ($scope.taskId != null){
                return true;
            }
            else {
                return false;
            }
        }

        $scope.delete = function( value ){
            delete $scope.names.splice(value, 1);
        }

        $scope.names = [
            {
                "id": 1,
                "firstName": "Mackenzie",
                "lastName": "Hodges",
                "gender": "female",
                "age": 30,
                "registered": 1288323623006,
                "email": "mackenzie@multitiqua.com"
            },
            {
                "id": 2,
                "firstName": "Aaliyah",
                "lastName": "Hailey",
                "gender": "male",
                "age": 21,
                "registered": 1288323623006,
                "email": "aaliyah@polytheon.com"
            },
            {
                "id": 3,
                "firstName": "Lillian",
                "lastName": "Goodman",
                "gender": "female",
                "age": 27,
                "registered": 1288323623006,
                "email": "lillian@ienland.com"
            },
            {
                "id": 4,
                "firstName": "Gabrielle",
                "lastName": "Warren",
                "gender": "male",
                "age": 25,
                "registered": 1288323623006,
                "email": "gabrielle@infraique.com"
            },
            {
                "id": 5,
                "firstName": "Layla",
                "lastName": "Ogden",
                "gender": "male",
                "age": 27,
                "registered": 1288323623006,
                "email": "layla@rapigrafix.com"
            },
            {
                "id": 6,
                "firstName": "Maya",
                "lastName": "Turner",
                "gender": "male",
                "age": 28,
                "registered": 1288323623006,
                "email": "maya@polytheon.com"
            },
            {
                "id": 7,
                "firstName": "Brooklyn",
                "lastName": "Oldridge",
                "gender": "male",
                "age": 21,
                "registered": 1288323623006,
                "email": "brooklyn@superscope.com"
            },
            {
                "id": 8,
                "firstName": "Brooklyn",
                "lastName": "Fulton",
                "gender": "female",
                "age": 22,
                "registered": 1288323623006,
                "email": "brooklyn@infoairway.com"
            },
            {
                "id": 9,
                "firstName": "Isabella",
                "lastName": "Gate",
                "gender": "female",
                "age": 22,
                "registered": 1288323623006,
                "email": "isabella@esteganoergy.com"
            },
            {
                "id": 10,
                "firstName": "Peyton",
                "lastName": "Oliver",
                "gender": "female",
                "age": 33,
                "registered": 1288323623006,
                "email": "peyton@dynarama.com"
            },
            {
                "id": 11,
                "firstName": "Jocelyn",
                "lastName": "Oldman",
                "gender": "male",
                "age": 24,
                "registered": 1288323623006,
                "email": "jocelyn@netseco.com"
            },
            {
                "id": 12,
                "firstName": "Gianna",
                "lastName": "Conors",
                "gender": "male",
                "age": 33,
                "registered": 1288323623006,
                "email": "gianna@unologic.com"
            },
            {
                "id": 13,
                "firstName": "Destiny",
                "lastName": "Conors",
                "gender": "male",
                "age": 23,
                "registered": 1288323623006,
                "email": "destiny@systheon.com"
            },
            {
                "id": 14,
                "firstName": "Sophie",
                "lastName": "Ford",
                "gender": "female",
                "age": 25,
                "registered": 1288323623006,
                "email": "sophie@us omnigraphik.com"
            },
            {
                "id": 15,
                "firstName": "Serenity",
                "lastName": "Molligan",
                "gender": "male",
                "age": 35,
                "registered": 1288323623006,
                "email": "serenity@fibrotouch.com"
            },
            {
                "id": 16,
                "firstName": "Makayla",
                "lastName": "Ford",
                "gender": "male",
                "age": 40,
                "registered": 1288323623006,
                "email": "makayla@polytheon.com"
            },
            {
                "id": 17,
                "firstName": "Melanie",
                "lastName": "Sherlock",
                "gender": "female",
                "age": 37,
                "registered": 1288323623006,
                "email": "melanie@robocomm.com"
            },
            {
                "id": 18,
                "firstName": "Kylie",
                "lastName": "Gilson",
                "gender": "female",
                "age": 38,
                "registered": 1288323623006,
                "email": "kylie@entcast.com"
            }
        ];
    }]);
