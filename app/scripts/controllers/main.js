'use strict';

angular.module('cloudstore')
  .controller('MainCtrl', function ($scope, $log, $http, $fileUploader) {

    $scope.providers = [
      { name: 'Amazon', id: 1 },
      { name: 'Rackspace', id: 2 },
      { name: 'Azure', id: 3 }
    ];

    $scope.getContainers = function() {
      $http.get('/containers', { params: { providerName: $scope.selectedProvider.name } }).success(function(data) {
        $scope.containers = data.containers;
      });
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

    $scope.onContainerSelected = function () {
      $scope.uploader.formData = [{
        providerName: $scope.selectedProvider.name,
        containerName: $scope.selectedContainer.name
      }];
    };

    var uploader = $scope.uploader = $fileUploader.create({
      scope: $scope, // to automatically update the html. Default: $rootScope
      url: '/upload'
    });

    // REGISTER HANDLERS

    // uploader.bind('afteraddingfile', function (event, item) {
    //   $log.log('After adding a file', item);
    // });

    // uploader.bind('afteraddingall', function (event, items) {
    //   $log.log('After adding all files', items);
    // });

    // uploader.bind('changedqueue', function (event, items) {
    //   $log.log('Changed queue', items);
    // });

    // uploader.bind('beforeupload', function (event, item) {
    //   $log.log('Before upload', item);
    // });

    // uploader.bind('progress', function (event, item, progress) {
    //   $log.log('Progress: ' + progress, item);
    // });

    // uploader.bind('success', function (event, xhr, item) {
    //   $log.log('Success: ' + xhr.response, item);
    // });

    // uploader.bind('complete', function (event, xhr, item) {
    //   $log.log('Complete: ' + xhr.response, item);
    // });

    // uploader.bind('progressall', function (event, progress) {
    //   $log.log('Total progress: ' + progress);
    // });

    // uploader.bind('completeall', function (event, items) {
    //   $log.log('All files are transferred', items);
    // });

  });

