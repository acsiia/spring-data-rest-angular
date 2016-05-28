var taskManagerModule = angular.module('taskManagerApp', ['solo.table']);


taskManagerModule.controller('employeeManagerController', function ($scope, $http) {

    var urlBase = "";
    $scope.toggle2 = true;
    $http.defaults.headers.post["Content-Type"] = "application/json";

    function findAllEmployees() {
        //get all tasks and display initially
        $http.get(urlBase + '/employees').success(function (data) {
            if (data._embedded != undefined) {
                $scope.employees = data._embedded.employees;
            } else {
                $scope.employees = [];
            }
            $scope.bindData($scope.employees);

            $scope.employeeFirstName = "";
            $scope.employeeLastName = "";
            $scope.employeePosition = "";
            $scope.employeeBranch = "";
            $scope.toggle2 = '!toggle2';
        });
    }

    findAllEmployees();

    $scope.addEmployee = function addEmployee() {
        if ($scope.employeeFirstName == "" || $scope.employeeLastName == "" || $scope.employeePosition == "" || $scope.employeeBranch == "") {
            alert("All fields must be filled");
        }
        else {
            $http.post(urlBase + '/employees', {
                firstName: $scope.employeeFirstName,
                lastName: $scope.employeeLastName,
                position: $scope.employeePosition,
                branch: $scope.employeeBranch
            }).success(function (data, status, headers) {
                findAllEmployees();
            });
        }
    };


    $scope.deleteEmployee = function deleteEmployee(taskUri) {

        if (taskUri != undefined) {
            $http.delete(taskUri).success(function (data, status, headers) {

            });
            findAllEmployees();
        }
    };

    $scope.updateEmployees = function updateEmployees() {
        findAllEmployees();
    };

});


