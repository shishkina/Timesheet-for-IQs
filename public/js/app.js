console.log("inside app.js");
var app = angular
								.module('IQsApp', ['ui.router', 'satellizer', 'ui.bootstrap'])
  							.config(['$stateProvider', '$urlRouterProvider', '$authProvider', MainRouter]);


function MainRouter(states, router, auth) {
	//Satellizer config specifies which route theJWT should be retrieved from
	auth.loginUrl = '/authenticate';
	//redirect to the auth state if any other states are requested
	router.otherwise('/auth');


	states
				.state('login',{
					url: '/auth',
					templateUrl: 'login.html',
					controller: 'AuthController as auth'
				})
				.state('adminView', {
					url:'/users',
					templateUrl: 'adminView.html'
				})
				.state('signup', {
					url: '/auth/signup',
					templateUrl: 'signup.html'
				})
				.state('user', {
					url: '/users/:user',
					templateUrl: 'home.html'
				})
				.state('update', {
					url:'/users/:user',
					templateUrl: 'update.html'
				});
}
