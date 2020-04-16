# stock-portfolio
to view the live site go [here](http://vue-portfolio-project.s3-website.us-east-2.amazonaws.com/)
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
- setup aws profile via aws cli, then:
```
vue invoke s3-deploy    # answer prompts to setup vue.config.js with bucket info & create deploy script 
npm run build   # build
npm run deploy  # deploy
```

### TODOs
- add in form validation
- styling
- refactor to have stock & portfolio modules
- add animations
