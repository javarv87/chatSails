var app = angular.module('chatApp', ['ui.router']);
app.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise("/");
  $stateProvider
    .state('app', {
      url: "/",
      templateUrl: "templates/chat.html",
      controller: 'ChatCtrl'
    })
});
app.controller('ChatCtrl', ['$scope', '$http', function($scope, $http) {
	var baseUrl = 'http://localhost:1337/chat/';
	$scope.chatList =[];
  $scope.user = {};
	$scope.getAllchat = function(){
		io.socket.get('/chat/addConversation');
		$http.get(baseUrl)
    .then(function(users){
      $scope.chatList = users.data;
    });
  };
  $scope.getAllchat();
	io.socket.on('chat',function(obj){
	  if(obj.verb === 'created'){
		  $scope.chatList.push(obj.data);
		  $scope.$digest();
	  }
  });
  $scope.sendMsg = function(user){
		io.socket.post('/chat/addConversation/', {user: user.user, message: user.message});
		$scope.user.message = "";
	};
}]);
