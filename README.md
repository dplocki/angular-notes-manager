# 🗒️ Angular Notes Manager

This is a small Angular 2 application. The main and only purpose of this app is to manage notes, which are saved in the browser's `localStorage`. It allows users to create, edit, and delete notes, and it also supports autosave.

## 📜 Historic background

This was a recruitment project and also one of my first projects in Angular (I had a few in AngularJS before). I decided to upgrade it, as I couldn't run it, even with the proper Node version from that time.

At the time (around 2016) I have used Angular 5, based on Node 7.

The original code is available in this repo by tag: [1.0.0](https://github.com/dplocki/angular-notes-manager/releases/tag/1.0.0).

## ⌨️ Current state

* use Angular 16
* the favicon comes from https://www.freefavicon.com/
* promises has been replaced by observables

## 🛠️ Docker

```sh
docker build . -t angular-notes-manager
docker run --rm -p 4200:4200 -p 9876:9876 -p 49153:49153 -it angular-notes-manager
```

### Running the Angular app in container

Enter the image:

```sh
docker run --rm -p 4200:4200 -p 9876:9876 -p 49153:49153 -v $(pwd):/build -it angular-notes-manager /bin/sh
```

You need to specify the host of the app (in `angular.json` configuration file) or by command:

```sh
ng serve --host 0.0.0.0
```

The need ports are: `4200` and `49153` for refresh.

## 📝 Notes

### Docker and karma tests

Turns out it is not so easy. There are many tutorials on how to run Karma inside the docker container, but they seem not to be working now (most of them were made at least a few years ago). Probably, Chrome has changed. Definitely, the link to Google Chrome has changed.

Luckily I found the solution: [How to run Karma tests from docker container? - the third replay](https://stackoverflow.com/a/72306681). Based on that I have adjusted my [Dockerfile](./Dockerfile).

### Running test during CI

Unfortunately, running the unit test during gateway checking was also not so easy. Finally, the following command runs properly:

```sh
ng test --browsers=ChromeHeadless --no-watch --no-progress
```

### Visual Code extensions:

* [Dev Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers)
* [Angular Language Service](https://marketplace.visualstudio.com/items?itemName=Angular.ng-template)
* [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint) - for support the eslint detection in the Visual Code
* [Test Explorer UI](https://marketplace.visualstudio.com/items?itemName=hbenl.vscode-test-explorer) - for automatic unit test support (works in Dev Containers, but little too slow and can crash)
* [Karma Test Explorer (for Angular, Jasmine, and Mocha)](https://marketplace.visualstudio.com/items?itemName=lucono.karma-test-explorer)
