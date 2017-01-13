var portfolio = angular.module('portfolio',[]);

function mainController($scope,$http) {
	$http.get('/api/portfolio')
		.success(function(data) {
			$scope.portfolio = data;
			console.log(data);
	});
	$scope.deletePosition = function (symbol) {
		$http.delete('/api/portfolio/stock/' + symbol)
        .success(function(data) {
        	$http.get('/api/portfolio')
    		.success(function(data) {
    			$scope.portfolio = data;
    			console.log(data);
    	});
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
	    
	};
	$scope.addPosition = function () {
		$http.post('/api/portfolio/stock',$scope.formData )
        .success(function(data) {
        	$scope.formData = {};
        	$http.get('/api/portfolio')
    		.success(function(data) {
    			$scope.portfolio = data;
    			console.log(data);
    	});
        })
        .error(function(data) {
            console.log('Error: ' + data);
        });
	    
	};
	
}