# JS test

## Folder structure

```
test/
└─── README.md
└─── .babelrc
└─── .env
└─── .gitignore
└─── package.json
└─── jest.config.js
└─── webpack.config.js
└─── src/
│   └─── assets
│   └─── constants
│   └─── test1/
│   │   └─── test1.js
│   │   └─── test1.test.js
│   └─── test3/
│   │   └─── test3.js
│   │   └─── test3.test.js
│   └─── utils/
│   │   └─── utils.js
│   │   └─── utils.test.js
│   └─── index.js
└─── public/
│   └─── index.html
│   └─── bundle.js
│   └─── main.css
```
   


## Get started
Run `npm install` for the first time to install all the needed.

## How to test
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
