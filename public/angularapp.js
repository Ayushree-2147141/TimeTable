angular.module('myapp',[])
.controller('ctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:3000/getteachers')
    .success(function(response)
    {
        // console.log($scope.length);
        $scope.teachers=response;
        // $scope.count=$scope.table.length;
    })
})

angular.module('mydeptapp',[])
.controller('deptctrldetails',function($scope,$http)
{
    $http.get('http://127.0.0.1:3000/getdepartment')
    .success(function(response)
    {
        console.log($scope.length);
        $scope.department=response;
        $scope.count=$scope.table.length;
    })
})

angular.module('mydeptteachersapp',[])
.controller('deptteachersctrldetails', function($scope, $http)
{
    $http.get('http://127.0.0.1:3000/submitCourse')
    .success(function(response)
    {
        console.log(response);
    })
})
