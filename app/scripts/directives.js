angular.module("directives", ["directives.editable"]);

angular.module("directives.editable", []).directive("ng-editable", function() {
	return {
		template: "<b data-ng-transclude=\"\"></b>",
		transclude: true
	};
});