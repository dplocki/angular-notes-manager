# Angular Notes Manager

The small Angular2 application. Main and only purpose: managing notes (save in browser `localStorage`). Allow to create, edit and deleting notes. Autosave is available.

## Historic background

This was a recruitment project. Also one of mine first projects in Angular (I had few in AngularJS before).
I decide to upgrade it, since I couldn't run it, even with proper Node version from the time.

The original code is available in this repo by tag: [1.0.0](https://github.com/dplocki/angular-notes-manager/releases/tag/1.0.0).

## Docker

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
