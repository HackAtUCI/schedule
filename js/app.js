angular.module('app', [])
	.controller('ScheduleCtrl', ['$scope', '$document', '$timeout', '$http', function($scope, $document, $timeout, $http) {
    $scope.schedule = [];

    $http
      .get('./config.json')
      .then(function(res) {
        if (window.location.hostname === 'schedule-demo.hackuci.com') {
          $scope.startDate = moment().add(7.32, 'hours');
        } else {
          $scope.startDate = moment(res.data.startDate);
        }
        $scope.endDate = moment(res.data.endDate);
        var scheduleUrl = res.data.scheduleUrl;

        $scope.calcCountdown();

        $http
          .get(scheduleUrl)
          .then(function(res) {
            for (var day in res.data) {
              $scope.schedule.push({ day: day, schedule: res.data[day] });
            }
          });
      });

    $scope.calcCountdown = function() {
      var now = Date.now();
      if (now <= $scope.startDate) {
        // countdown to start
        var diff = $scope.startDate - now;
        $scope.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        $scope.hours = (Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) + ($scope.days * 24);
        $scope.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        $scope.seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if ($scope.minutes < 10) {
          $scope.minutes = '0' + $scope.minutes;
        }

        if ($scope.seconds < 10) {
          $scope.seconds = '0' + $scope.seconds;
        }

        $timeout($scope.calcCountdown, 1000);
      } else if (now <= $scope.endDate) {
        // countdown to end
        var diff = $scope.endDate - now;
        $scope.days = Math.floor(diff / (1000 * 60 * 60 * 24));
        $scope.hours = (Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))) + ($scope.days * 24);
        $scope.minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        $scope.seconds = Math.floor((diff % (1000 * 60)) / 1000);
        
        if ($scope.minutes < 10) {
          $scope.minutes = '0' + $scope.minutes;
        }

        if ($scope.seconds < 10) {
          $scope.seconds = '0' + $scope.seconds;
        }

        $timeout($scope.calcCountdown, 1000);
      } else {
        // don't count up!
        $scope.days = 0;
        $scope.hours = '0';
        $scope.minutes = '00';
        $scope.seconds = '00';
      }
    }

    var originalSchedulePosition = document.getElementsByClassName('schedule-box')[0].getBoundingClientRect().top;
    var countdownPosition = document.getElementsByClassName('countdown-container')[0].getBoundingClientRect().top;

    $document.on('scroll', function() {
      var schedulePosition = document.getElementsByClassName('schedule-box')[0].getBoundingClientRect().top;

      if (schedulePosition <= originalSchedulePosition) {
        $scope.$apply(function() {
          $scope.countdownOpacity = (schedulePosition - countdownPosition) / (originalSchedulePosition - countdownPosition);
        })
      } else {
        $scope.$apply(function() {
          $scope.countdownOpacity = 1;
        })
      }
    });

    $('.navbar-mobile-menu-icon').on('click', function() {
      $('.navbar-modal')
        .modal('setting', 'transition', 'fade left')
        .modal('show');
    });

    $('.navbar-mobile-menu-close-icon').on('click', function() {
      $('.ui.modal').modal('hide');
    })

    $scope.onMenuClick = function() {
      $('.ui.modal').modal('hide');
    }
	}]);