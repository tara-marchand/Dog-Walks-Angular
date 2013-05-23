# Dog-Walks-Angular

A simple app with dog info using AngularJS on the front end and Firebase on the back end, using the latter's angularFire bindings.

## File Organization

- `app` contains the application's itself, and `test` contains its tests.
- In `app`, the page itself is `index.html`.
- `scripts` contains application-level and third-party JavaScript, the latter in `libs`.
- AngularJS code is organized by feature (rather than by type [e.g., services, controllers]) in `modules` -- see [Cliff Meyers' approach](http://cliffmeyers.com/blog/2013/4/21/code-organization-angularjs-javascript).

In each module's folder:

- Each module's JavaScript (instantiation, configuration, services, controllers) is in a single, module-named file.
- Each module's views are HTML files named with a "-view" suffix.

```
	app/
		index.html
		modules/
		scripts/
			app.js
			libs/
	test/
```
