'use strict';

ionic.Platform.ready(function(){
    console.log("Platform is ready!");

  if(window.StatusBar) {
      StatusBar.styleDefault();
    }

});

var PhoneGapInit = function () {
  this.boot = function () {
    angular.bootstrap(document, ['STDemoApp']);
  };

  if (window.phonegap !== undefined) {
    document.addEventListener('deviceready', function() {
      this.boot();
    });
  } else {
    console.log('PhoneGap not found, booting Angular manually');
    this.boot();
  }
};

angular.element(document).ready(function() {
  new PhoneGapInit();
});



/**
 * @ngdoc overview
 * @name STDemoApp
 * @description
 * # STDemoApp
 *
 * Main module of the application.
 */
//var app = angular.module('STDemoApp', ['ionic' , 'STDemoApp.controllers'  ]);

angular.module('STDemoApp.controllers', []);
angular.module('STDemoApp.services', []);
angular.module('STDemoApp.directives', []);

angular.module('STDemoApp', ['ionic', 'ngTouch', 'STDemoApp.services', 'STDemoApp.controllers', 'STDemoApp.directives'])

    .run(function($rootScope, $window) {
        console.log("**** app.run");
        $rootScope.windowWidth = $window.outerWidth;
        $rootScope.appVersion = appConfig.version;
        $rootScope.bookZoom = 3; // 3 is normal, 0 is smallest, 5 is biggest
        $rootScope.bookDarkMode = false;

        $rootScope.allowRightMenu = false;

        if ($rootScope.windowWidth < 768) {
            $rootScope.isTablet = false;
        } else {
            //$rootScope.isTablet = true;
            // TODO - now disabled because it doesn't work in big browsers window (doesn't get the iframe width)
            $rootScope.isTablet = false;
        }
        angular.element($window).bind('resize', function() {
            $rootScope.windowWidth = $window.outerWidth;
            $rootScope.$apply('windowWidth');
        });
    })

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            .state('home', {
                url: '/home',
                templateUrl: 'views/home.html',
                controller: 'HomeController'
            })
            .state('about', {
                url: '/about',
                templateUrl: 'views/about.html'
            })
            .state('books', {
                url: '/books',
                templateUrl: 'views/notifications.html',
                controller: 'BooksController'
            })
            .state('book-detail', {
                url: '/book/:bookId',
                templateUrl: 'views/notification-detail.html',
                controller: 'BookDetailController'

            })
            .state('media-index', {
                url: '/media',
                templateUrl: 'views/medias.html',
                controller: 'MediaIndexController'
            })
            .state('media-detail', {
                url: '/media-show/:mediaId',
                templateUrl: 'views/media-detail.html',
                controller: 'MediaDetailController'

            })
            .state('places', {
                url: '/places',
                templateUrl: 'views/places.html',
                controller: 'PlacesController'

            })
            .state('place-detail', {
                url: '/place/:placeId',
                templateUrl: 'views/place-detail.html',
                controller: 'PlaceDetailController'
            })
            .state('options', {
                url: '/options',
                templateUrl: 'views/options.html',
                controller: 'OptionsController'
            })
            .state('credits', {
                url: '/credits',
                templateUrl: 'views/credits.html'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/home');

    });
