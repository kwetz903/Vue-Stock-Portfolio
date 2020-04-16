# stock-portfolio

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## to deploy
- build project
```
npm run build
```
- [setup AWS Bucket](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/static-website-hosting.html)
    - had to enable static website hosting with index dooc & errror doc to be `index.html`
    - for this project, we made the bucket have public access
    - put everything in dist folder on the server -> TODO need to figure out how to do that via script not freaking drag & drop

### TODOs
- add in form validation
- styling
- refactor to have stock & portfolio modules
- add animations
