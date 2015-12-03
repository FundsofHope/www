/**
 * Created by addiittya on 03/12/15.
 */
angular.module('mainCtrl', [])


    .controller('MainController', function($rootScope, $location, Auth) {

        var obj = this;


        obj.loggedIn = Auth.isLoggedIn();

        $rootScope.$on('$routeChangeStart', function() {

            obj.loggedIn = Auth.isLoggedIn();

            Auth.getUser()
                .then(function(data) {
                    obj.user = data.data;
                });
        });


        obj.doLogin = function() {

            obj.processing = true;

            obj.error = '';

            Auth.login(obj.loginData.username, obj.loginData.password)
                .success(function(data) {
                    obj.processing = false;

                    Auth.getUser()
                        .then(function(data) {
                            obj.user = data.data;
                        });

                    if(data.success)
                        $location.path('/');
                    else
                        obj.error = data.message;

                });
        }


        obj.doLogout = function() {
            Auth.logout();
            $location.path('/logout');
        }


    });