
 // reference the module and name it scotchApp
    var appAngular = angular.module('appAngular');	

appAngular.controller('dictionaryController', ['$scope', '$http', '$uibModal', '$timeout',  '$location', '$document', 'dictionaryService', 
	function ($scope, $http, $uibModal, $timeout, $location, $document, dictionaryService) {

	    //console.log("Hello  World from dictionaryController - " + JSON.stringify($location));
	    //console.log("protocol:" + $location.protocol() + ", host:" + $location.host() + ", port:" + $location.port() + ", path:" + $location.path());
        
	    //$scope.endpoint = "" + $location.protocol() + "://" + $location.host() + ":" + $location.port();// + "/";    //  + $location.path();
	    //console.log("endpoint = " + $scope.endpoint);

	    $scope.glossaryTooltipHtml = "sfsfsfssf";
        $scope.pageClass = 'page-tables';
		
		$scope.changed = false;
		$scope.checkAll = false;

		$scope.reportSelected = 'ALL';

		$scope.chkLoad_YN_change = function() {
			$scope.changed = true;
		};

		$scope.chkALL_click = function() {
			var yesNo = $scope.checkAll ? 'Y': 'N'; 

			for(var i = 0; i < $scope.cpsTables.length; i++) {
				$scope.cpsTables[i].load_YN = yesNo;
			}
		};


	    // open modal dialog box - heading detail
		$scope.openModalDictionaryDetail = function (size, row) {
		    var hello = 'Howdy Partner';
		    console.log('$scope.openModalDictionaryDetail ' + hello);

		    var modalDetail = $uibModal.open({
		        animation: $scope.animationsEnabled,
		        templateUrl: 'dictionaryDetail.html',
		        controller: 'dictionaryDetailController',
		        //backdrop: 'static',
		        scope: $scope,
		        windowClass: 'mynewModal-modal-window',
		        resolve: {
		            items: function () {	// !!!! Ahhhh! only resolves items
		                return row;
		            } // end items
		        } // end reslove
		    }); // end var
		    modalDetail.result.then(
                 function (changed) {
                     console.log('dictionaryController.modalDetail.result.then()', changed);
                     //$scope.doGet();
                     $scope.doSelectReport($scope.reportSelected);
                 }
             );
		} // end open function




	    // open modal dialog box - term usage
		$scope.openModalTermUsage = function (row) {
		    var hello = 'Howdy Partner';
		    console.log('$scope.openModalTermUsage ' + hello);

		    var modalInstance = $uibModal.open({
		        animation: $scope.animationsEnabled,
		        templateUrl: 'term.html',
		        controller: 'termController',
		        resolve: {
		            items: function () {	// !!!! Ahhhh! only resolves items
		                return row.Glossary;
		            } // end items
		        } // end reslove
		    }); // end var
		} // end open function


        // doGet() - get ALL dictionary
		$scope.doGet = function() {
		    console.log("dictionaryController.doGet() hit");
		    // loading graphic visible
		    $scope.loading = true;
		    $scope.statusMessage = "Loading ..."

		    dictionaryService.get()
				.success(function (response) {
				    console.log("dictionaryController.doGet() - success");
					//console.log(JSON.stringify(response, null, 2));
					$scope.odataData = response;
					$scope.statusMessage = "Succeeded"
					$scope.loading = false; // loading succeeded
				})
				.error(function(error) {	
				    console.log("dictionaryController.doGet() - failed: " + error);
				    $scope.statusMessage = "Failed!  ... " + JSON.stringify(error);
				    $scope.loading = true; // loading stopped
				});
			};


	    // doGetByReportName(reportName) - get dictionary by reportName
		$scope.doGetByReportName = function (reportName) {
		    console.log("reportController.doGetByReportName() hit");
		    // loading graphic visible
		    $scope.loading = true;
		    $scope.statusMessage = "Loading ..."

		    dictionaryService.getByReportName(reportName)
				.success(function (response) {
				    console.log("reportController.doGetByReportName() - success");
				    //console.log(JSON.stringify(response, null, 2));
				    $scope.odataData = response;
				    $scope.statusMessage = "Succeeded"
				    $scope.loading = false; // loading succeeded
				})
				.error(function (error) {
				    console.log("reportController.doGetByReportName() - failed: " + error);
				    $scope.statusMessage = "Failed!  ... " + JSON.stringify(error);
				    $scope.loading = true; // loading stopped
				});
		};


        // doPost(data) - insert/update
		$scope.doPost = function (data) {
		    //return new Promise(function (resolve, reject) {

		        // set glossary_id to Glossary.glossary_id
		        data.glossary_id = data.Glossary.Glossary_id;
		        console.log('dictionaryController.doPost()', data);

                // returns a promise so don't have to create one
		        return dictionaryService.post(data)
                    .success(function (response) {
                        console.log("dictionaryController.doPost() - success");
                        console.log(JSON.stringify(response, null, 2));
                        //resolve(response);  // resolve promise
                    })
			        .error(function (error) {
			            console.log("dictionaryController.doPost() - failed: " + error);
			            //reject(error);  //  reject promise
			        });
		    //}); // end promise
        }; // end doPost


		$scope.doGetReportList = function () {
		    console.log("dictionaryController.doGetReportList() hit");
		    // loading graphic visible

		    dictionaryService.getReportList()
				.success(function (response) {
				    console.log("dictionaryController.doGetReportList() - success");
				    //console.log(JSON.stringify(response, null, 2));
				    $scope.reportList = response;
				    $scope.reportList.splice(0, 0, 'ALL');
				    console.log(JSON.stringify($scope.reportList, null, 2));
				    $scope.reportSelected = 'ALL';
				})
				.error(function (error) {
				    console.log("dictionaryController.doGetReportList() - failed: " + error);
				});
		};


		$scope.delete = function (data) {
		    return new Promise(function (resolve, reject) {
		        console.log('dictionaryController.doURIDelete()', data);

		        dictionaryService.delete(data.reportMapping_id)
                    .success(function (response) {
                        console.log("dictionaryController.doPost() - success");
                        console.log(JSON.stringify(response, null, 2));
                        resolve(response);  // resolve promise
                        //$scope.doGet();
                    })
			        .error(function (error) {
			            console.log("dictionaryController.doPost() - failed: " + error);
			            reject(error);  //  reject promise
			        });
		    }); // end promise
		}; // end doPost

		$scope.showDetail = function(id) {

			alert("show detail - " + id);			
		}

			

		$scope.showScope = function() {
			console.log(JSON.stringify($scope.cpsTables));
		};


		// utility function to get arguments from URL
		$scope.getParameterByName = function(name, url) {
	        if (!url) url = window.location.href;
	        name = name.replace(/[\[\]]/g, "\\$&");
	        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
	            results = regex.exec(url);
	        if (!results) return null;
	        if (!results[2]) return '';
	        return decodeURIComponent(results[2].replace(/\+/g, " "));
	    }

	    // utility function to wait
		function wait(ms) {
		    var start = new Date().getTime();
		    var end = start;
		    while (end < start + ms) {
		        end = new Date().getTime();
		    }
		}

        // row click
	    $scope.setRowSelected = function(id) {
	        $scope.selectedRow = id;
	        console.log('setRowSelected() ' +  $scope.selectedRow );
	    }


	    $scope.setRowClass = function (id) {
	    	//console.log('setRowClass() hit ' + id + ', ' +$scope.selectedRow);
	    	if(id==$scope.selectedRow) {
	    		console.log('setRowClass() found match');
	    		//$scope.scrollToRow(id);
	    		return 'selected';
	    	}
	    }


	    $scope.getFieldName = function (str) {
	        var fieldName = str.substring(41, 100);
	        //console.log(str + "   " + fieldName);
	        return fieldName;
	    }





	    //---------------------
	    // UI select report change
		 $scope.doSelectReport = function (reportName) {
		     console.log(reportName);
             
             // store reportName
		     $scope.reportSelected = reportName;

		     if (reportName == 'ALL')
		         $scope.doGet();
             else
		        $scope.doGetByReportName(reportName);
		 };
        //---------------------


		 $scope.windowClose = function () {
		 	self.close();
		 }

        // after data has loaded
		 //$scope.$on('$viewContentLoaded', function () {
		 //    console.log('view content fully loaded.  $scope.selectedRow=' + $scope.selectedRow);
		 //    if ($scope.selectedRow != null)
		 //       $scope.scrollToRow($scope.selectedRow);
		 //});

	    // test
		 
	    // utility function - scrollIntoView
		 $scope.scrollToRow = function (id) {
		     var elem = document.getElementById('row' + id);
		     console.log('scrollToRow() id=' + id + '.  elem=' + elem);
             if(elem !== null)
		        elem.scrollIntoView(true);
		 }

		 $scope.newDictionaryItem = function () {
		     return {
                 "reportMapping_id": null,
                 "ReportName": "",
                 "User_Story": "",
                 "Purpose": "",
                 "Source_DB": "",
                 "Name_of_SP_DQ": "",
                 "Column_As_Displayed": "",
                 "True_Column_Name": "",
                 "SP_DQ_Column__Mapping_0_": "",
                 "SP_Calculation___Aliasing": null,
                 "Data_Type": "",
                 "DataFlow": "",
                 "Mapping_1___Key_Criteria": "",
                 "Mapping_2___Key_Criteria": "",
                 "Mapping_3___Key_Criteria": "",
                 "Mapping_4___Key_Criteria": "",
                 "Mapping_5___Key_Criteria": "",
                 "Source_Columns____Selected_Fields": "",
                 "Source_Columns___Join_Where_Group_Formula_Fields": null,
                 "Notes": "",
                 "glossary_id": null,
                 "implementation": "",
                 "Glossary": {
                     "Glossary_id": null,
                     "Metric": "",
                     "Description": "",
                     "Applies_to": "",
                     "Abbreviation": "",
                     "Frequency": null,
                     "Calculation": null,
                     "Truncate_decimal_places": null,
                     "Alternate_Names": null,
                     "Notes": null,
                 },
		     }
		 };


	    // event after DOM loaded
	    //note: following is cheese, the DOM is ready when $document.ready() is fired as can be seen from console.log(document), 
		 // however getElementById() does not return the element
        //  therefore we delay by 1 second then the getElementById() works which is used in the call scrollToRow() .... ghrrr!!!
		 $document.ready(function () {
		     console.log('$document.ready() hit, $scope.selectedRow=' + $scope.selectedRow);
		     //console.log(document);
		    $timeout(function () {
		    //    if ($scope.selectedRow != null) {
		            $scope.scrollToRow($scope.selectedRow);
		    //    }
		        console.log('update with timeout fired');
		    }, 1000);
		 });
        //test

        // elem does not exist in this method
		 //$timeout(function () {
		 //    console.log('$timeout() hit');
		 //    if ($scope.selectedRow != null)
		 //        $scope.scrollToRow($scope.selectedRow);
		 //});

	    // on startup 
	    // get data
	    // set id from URL
	    $scope.selectedRow = $scope.getParameterByName('id'); // "lorem"
	    console.log('onstartup id=' + $scope.selectedRow);
	    // get all data
	    $scope.filterText = '';

	    // get data after 3 seconds for testing purposes
	    //$timeout(function () {
	    $scope.doGet();

	    $scope.doGetReportList();


	    //}, 3000);

		// initialize data
		//$scope.URIText = "http://localhost:51191/odata/Cars?$filter=startswith(name,'toy')";
	}
]);




