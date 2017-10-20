// global. currently active menu item
var current_item = 0;

// few settings
var section_hide_time = 1300;
var section_show_time = 1300;

// jQuery stuff
jQuery(document).ready(function($) {

  // Switch section
  $("a", '.mainmenu').click(function() {
    if (!$(this).hasClass('active')) {
      current_item = this;
      // close all visible divs with the class of .section
      $('.section:visible').fadeOut(section_hide_time, function() {
        $('a', '.mainmenu').removeClass('active');
        $(current_item).addClass('active');
        var new_section = $($(current_item).attr('href'));
        new_section.fadeIn(section_show_time);
      });
    }
    return false;
  });
});

angular.module('Wiki', ['ui.router']).config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    $stateProvider.state('forum', {
      url: '/forum',
      templateUrl: '/forum.html',
      controller: 'MainCtrl'
    }).state('posts', {
      url: '/posts/{id}',
      templateUrl: '/posts.html',
      controller: 'PostsCtrl'
    });

    $urlRouterProvider.otherwise('forum');
  }
]).factory('postFactory', [function() {
    var o = {
      posts: []
    };
    return o;
  }
]).controller('MainCtrl', [
  '$scope',
  'postFactory',
  function($scope, postFactory) {
    $scope.test = 'Hello world!';
    $scope.posts = postFactory.posts;
    $scope.addPost = function() {
      if ($scope.formContent === '' || $scope.formTitle === '') {
        return;
      }
      $scope.posts.push({
					title: $scope.formTitle,
					content: $scope.formContent,
					comments: []
				});
      $scope.formContent = '';
			$scope.formTitle = '';
    };

		$scope.searchForum = function($event) {
			console.log($event);
			for (i = 0; i < $scope.posts.size; i++) {

			}
		}
  }
]).controller('PostsCtrl', [
  '$scope',
  '$stateParams',
  'postFactory',
  function($scope, $stateParams, postFactory) {
    $scope.post = postFactory.posts[$stateParams.id];

    $scope.addComment = function() {
      if ($scope.body === '') {
        return;
      }
      $scope.post.comments.push({body: $scope.body});
      $scope.body = '';
    };

  }
]);
