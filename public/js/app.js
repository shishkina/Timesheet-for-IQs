console.log("inside app.js");
var app = angular
	.module('IQsApp', ['ui.router'])
  .config(['$stateProvider', '$urlRouterProvider', MainRouter]);


function MainRouter(states, router) {
  //routes
  states
		.state('home',{
			url: '/',
			templateUrl: 'home.html'
		})
    .state( 'signup',{
      url:'/signup',
      templateUrl:'signup.html'
    })
		.state('login', {
			url: '/login',
			templateUrl: 'login.html'
		})
		.state('adminView', {
			url: '/adminView',
			templateUrl: 'adminView.html'
		});

    router.otherwise('/');

}
