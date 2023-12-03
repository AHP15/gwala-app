# Gwala app

## this app is not complete yet due to some unexpected issues happen last 3 days

## Run locally
- the best way is using docker:
- if you have docker install on your OS, you can run the following command:

``` npm run dx ```

- If you don't have docker, you can run the following:
``` npm run start ```

## Run tests

### using docker
- the test rely on a mongoDB server:

run: ``` npm run testdb ``` and then ``` npm run test ```

After running the test you can stop the mongo container by running:
``` npm run stopdb ```

#### if don't have docker before you run test, you change all the uri connection in test file
#### to a one that running, otherwise the test will not work