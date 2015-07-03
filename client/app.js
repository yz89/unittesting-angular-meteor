Messages = new Mongo.Collection('messages');

/*
 * Don't forget the `angular-meteor` dependency. Angular needs it to communicate with meteor.
 */
var app = angular.module('app', ['angular-meteor']);

app.factory('messages', function ($meteor) {
    return {
        getCollection: function () {
            return $meteor.collection(Messages).subscribe('messages');
        },
        insert: function (text) {
            $meteor.call('insertMessage', text);
        }
    }
});

app.controller('MessageCtrl', function ($scope, messages) {
    $scope.text = '';

    $scope.messages = messages.getCollection();
    $scope.insert = function () {
        messages.insert($scope.text);
    }
});