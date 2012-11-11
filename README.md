# Workshop: Writing Testable JavaScript

## Installation

You will need to use the command line to install the dependencies for this project. See the section below on accessing the command line if you need help.

Note that you may need to perform some of these steps as an administrator. On OSX and Linux, you can run commands as an administrator by prefixing them with `sudo` and then typing in your password when prompted. On Windows, you will need to launch the `cmd.exe` program as an administrator.

### Node

You will need to [install Node.js v0.8.8 or newer](http://nodejs.org) to use this repo (you can also use a [package manager](https://github.com/joyent/node/wiki/Installing-Node.js-via-package-manager)). You can verify that Node is installed correctly by running `node --version` from the command line.

### Packages

Once you have Node installed, run `npm install` from the root directory of this project to install the dependencies.

### Grunt

Install [grunt](http://gruntjs.com) by running `npm install -g grunt`.

### PhantomJS

See the PhantomJS section [here](https://github.com/gruntjs/grunt/blob/master/docs/faq.md) for details on installing PhantomJS.


## Running the Code and Tests

- To run the tests: `grunt test`
- To run the server: `node server`

## Running Specs

The specs in this repo are for demonstrating how you can use Selenium to write integration tests. You don't need to run them, but you can if you want to.

The specs make use of Ruby, so if you want to run them, you will need to have Ruby ~1.9.3 installed. You will also need to `gem install bundler` and then `bundle install` from the root directory of this project.

Once you have Ruby, bundler, and the required gems, you can run `grunt spec` to run the specs.

## Accessing the command line

**Windows**

Open **cmd.exe** (From the Start Menu, search for "cmd"). When installing npm modules globally, you may need to "Run as administrator," which you can do by right-clicking the `cmd` name in the programs list.

**OS X**

Open **Terminal.app** in `/Applications/Utilities`.