# React.js: Getting Started (Pluralsight) [![Build Status](https://travis-ci.org/Darmaiad/pluralsight-reactjs-gettingstarted.svg?branch=master)](https://travis-ci.org/Darmaiad/pluralsight-reactjs-gettingstarted) [![https://ci.appveyor.com/api/projects/status/github/Darmaiad/pluralsight-reactjs-gettingstarted?branch=master&svg=true](https://ci.appveyor.com/api/projects/status/github/Darmaiad/pluralsight-reactjs-gettingstarted?branch=master&svg=true)](https://ci.appveyor.com/api/projects/status/github/Darmaiad/pluralsight-reactjs-gettingstarted?branch=master&svg=true)

This project is based on the [Pluralsight](https://www.pluralsight.com/) course: [React.js: Getting Started](https://app.pluralsight.com/library/courses/react-js-getting-started/table-of-contents) by [Samer Buna](https://github.com/samerbuna). To view the final product, a simple game, go to: [https://darmaiad.github.io/pluralsight-reactjs-gettingstarted](https://darmaiad.github.io/pluralsight-reactjs-gettingstarted/).

## Installation
Assuming you have `npm` & `node.js` installed, you can either clone or download the repository. Navigate to the folder that you/was created. Then, run `npm install` on the command line to download the dependencies. Finally, run `npm start` to launch to the project. To do a production build run `npm run build`.

## Description
This is a simple game that matches numbers to stars. It includes an implementation of timer challenge issued by the course's author at the end of the course. I expanded on that by having the game to include a distinct start/stop phase. I used the React.js editions of [Bootstrap](https://react-bootstrap.github.io/getting-started.html) and [Font-Awesome](https://www.npmjs.com/package/react-fontawesome) instead of the conventional ones. Finally, I added some functionality with [Alertify.js](http://alertifyjs.com/).

A [CI/CD](https://en.wikipedia.org/wiki/CI/CD) pipeline is set up for this project. Upon push, [Travis-CI](https://travis-ci.org/) will attempt to build the project in a Linux environment and if the build is successful, it will be deployed at [Github Pages](https://pages.github.com/). A second [CI](https://en.wikipedia.org/wiki/Continuous_integration) server, [AppVeyor](https://ci.appveyor.com), was added to test the project in a Windows environment.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).
