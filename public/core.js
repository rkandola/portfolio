var portfolio = angular.module('portfolio',[]);

function mainController($scope,$http) {
	$http.get('/api/portfolio/version')
		.success(function(data) {
			$scope.version = data;
			console.log(data);
	});
}