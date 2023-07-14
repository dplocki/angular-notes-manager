# 🗒️ Angular Notes Manager

The small Angular2 application. Main and only purpose: managing notes (save in browser `localStorage`). Allow to create, edit and deleting notes. Autosave is available.

## 📜 Historic background

This was a recruitment project. Also one of mine first projects in Angular (I had few in AngularJS before).
I decide to upgrade it, since I couldn't run it, even with proper Node version from the time.

At the time (around 2016) I have used Angular 5, based on Node 7.

The original code is available in this repo by tag: [1.0.0](https://github.com/dplocki/angular-notes-manager/releases/tag/1.0.0).

## 🛠️ Docker

```sh
docker build . -t angular-notes-manager
docker run --rm -p 4200:4200 -p 9876:9876 -p 49153:49153 -v $(pwd):/build -it angular-notes-manager
```

### Running the Angular app in container

You need to specify the host of the app (in `angular.json` configuration file) or by command:

```sh
ng serve --host 0.0.0.0
```

The need ports are: `4200` and `49153` for refresh.

## 📝 Notes

### Docker and karma tests

Turns out it is not so easy. There are many tutorial how to run Karma inside the docker container, but they seems to be not working now (most of them was made at least few years ago). Probably the Chrome changed. Definitely the link to Google Chrome changed.

Luckily I found the solution: [How to run Karma tests from docker container? - the third replay](https://stackoverflow.com/a/72306681). Based on that I have adjusted my [Dockerfile](./Dockerfile).

### Visual Code estensions

* [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - for support the eslint detection in the Visual Code
* [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer) - for automatic unit test support (works in Dev Containers, but little too slow and can crash)
* [Karma Test Explorer (for Angular, Jasmine, and Mocha)](https://marketplace.visualstudio.com/items?itemName=lucono.karma-test-explorer)
