# Chapter 5
This chapter contains useful code snippets for the Automation Testing with Cypress Book chapter 3; 

In this chapter we will use an opensource application [(todomvc)](http://todomvc.com/examples/react/#/) to test the use of command line tools when running and debugging cypress tests.


## Executing Tests by folder
To executes tests in this chapter one needs to get into the chapter folder and run the tests from the test folder itself as every folder is a module on its own. 

```
$ cd chapter-5
```

### Installing project dependencies
```
$ npm install

or 

$ npm ci

```

### Running all Cypress Tests
```
$ npm run cypress:run
```
