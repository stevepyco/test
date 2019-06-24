# **JS TEST**

## FOLDER STRUCTURE

```
test/
└─── README.md
└─── .babelrc
└─── .gitignore
└─── package.json
└─── jest.config.js
└─── webpack.config.js
└─── src/
│   └─── assets
│   └─── constants
│   └─── Test1/
│   │   └─── test1.js
│   │   └─── test1.test.js
│   └─── Test3/
│   │   └─── test3.js
│   │   └─── test3.test.js
│   └─── utils/
│   │   └─── utils.js
│   │   └─── utils.test.js
│   └─── index.js
└─── public/
│   └─── index.html
```

## HOW TO RUN
* First of all, please run the command **npm install** to install all the needed.
* Afterwards, you see the folder structure that I have already set up the configuration file and it can run with a simple command line.
* To run the web in development environment.
```
npm run start
```
* To build and manipulate the app.
```
npm run build
```

## HOW TO TEST
* run all unit test suites
```
npm run test
```
* run unit test and watch for every time code changes
```
npm run test:watch
``` 
* run unit test with code coverage
```
npm run test:coverage
``` 

## TIME COMPLEXITY
### Test 1
* Time Complexity for `store` function: 
```
O(n²)
```
* Time Complexity for `load` function:
```
O(n²)
```
Reason for both functions are ***O(n²)*** because they are iterating over two different collections using two nested loops