# nodejs-ftp-cli

## Why use it？ 

  To be a developer, spending less time on solving code uploading problem is necessary for us.

## How to use it?

  Beheavior seems to be act as you are using ftp-client, left is your local resource, right is the server resource,
when you need to upload local resource to server resource, you need to drag them and put them in the right way to overwrite them.
But in this demo, what you need to do is:

  Upload catalog:

  ```
      node ./cli.js build [catalog]

  ```
  Upload single file:

  ```
      node ./cli.js upload [fileurl]
  ```

Maybe you can take some common packages which need to upload frequently in your `package.json`

eg:
  ```
  scripts: {
    build-app: node ./cli.js build app
 }
  ```
Then you can `npm run build-app` to start your ftp upload.

