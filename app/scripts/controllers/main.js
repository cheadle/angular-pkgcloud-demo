'use strict';

angular.module('cloudstore')
  .controller('MainCtrl', function ($scope, $log, $http, $fileUploader) {

    $scope.providers = [
      { name: 'Amazon', id: 1 },
      { name: 'Rackspace', id: 2 },
      { name: 'Azure', id: 3 }
    ];

    $scope.selectedProvider = {};
    $scope.selectedContainer = {};

    $scope.getContainers = function() {
      $http.get('/containers', { params: { providerName: $scope.selectedProvider.name } }).success(function(data) {
        $scope.containers = data.containers;
        $scope.onContainerSelected();
      });
    };

    $scope.onContainerSelected = function () {
      $scope.uploader.formData = [{
        providerName: $scope.selectedProvider.name,
        containerName: $scope.selectedContainer.name
      }];
    };

    // $scope.getFiles = function() {
    //   $http.get('/files', { params: { providerName: $scope.selectedProvider.name, containerName: $scope.selectedContainer.name } }).success(function(data) {
    //     $scope.files = data.files;
    //   });
    // };

    // $scope.downloadFile = function() {
    //   $http.get('/download').success(function(data) {
    //   });
    // };

    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope,
      url: '/upload'
    });

    uploader.bind('afteraddingfile', function (event, item) {
      $log.log('After adding a file', item);
    });

    // uploader.bind('beforeupload', function (event, item) {
    //   $log.log('Before upload', item);
    // });

    // uploader.bind('completeall', function (event, items) {
    //   $log.log('All files are transferred', items);
    // });

  });

