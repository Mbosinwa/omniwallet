angular.module("omniControllers")
	.controller("DExSaleController", ["$scope", "Orderbook", "PropertyManager",
		function DExSaleController($scope, Orderbook, PropertyManager ){
			$scope.selectedAddress = $scope.wallet.tradableAddresses()[0]
			$scope.selectedAsset = $scope.selectedAddress.balances[0];
			$scope.ecosystem = 1;
			$scope.setAddress = function(address){
				$scope.selectedAddress = address;
			}
			
			$scope.setAsset = function(asset){
				$scope.sellingAsset = asset;
				$scope.ecosystem = (asset.id < 2147483648 && asset.id != 2) ? 1 : 2;
				$scope.loadCurrencies();
			}

			$scope.loadCurrencies = function(){
				PropertyManager.listByEcosystem($scope.ecosystem).then(function(result){
			      $scope.availableTokens = result.data.properties.sort(function(a, b) {
			          var currencyA = a.name.toUpperCase();
			          var currencyB = b.name.toUpperCase();
			          return (currencyA < currencyB) ? -1 : (currencyA > currencyB) ? 1 : 0;
			      });
			      $scope.desiredAsset = $scope.availableTokens[0];
			  	});
			}
			
			$scope.validateDexSaleForm = function(){

				var orderbook = new Orderbook({desired:$scope.propertyDesired, selling:$scope.propertySelling});

			};
		}])