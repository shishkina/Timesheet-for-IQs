console.log("inside app.js");
var app = angular
								.module('IQsApp', ['ui.router', 'satellizer'])
  							.config(['$stateProvider', '$urlRouterProvider', '$authProvider', MainRouter]);


function MainRouter(states, router, auth) {
	//Satellizer config specifies which route theJWT should be retrieved from
	auth.loginUrl = '/authenticate';
	//redirect to the auth state if any other states are requested
	router.otherwise('/auth');


	states
				.state('auth',{
					url: '/auth',
					templateUrl: 'login.html',
					controller: 'AuthController as auth'
				})
				.state('users', {
					url:'/users',
					templateUrl: 'adminView.html',
					controller: 'UserController as user'
				})
				.state('user', {
					url: '/users/:id',
					templateUrl: 'home.html',
					controller: 'UserController as user'
				})


}
