# Portfolio
Basic node application with RestAPI to manage portfolio.

## To install

### Instal Node LTS 6.10

- Get node  ``wget https://nodejs.org/dist/v6.10.1/node-v6.10.1-linux-x64.tar.xz``
- Install xz untilites ``sudo apt-get install xz-utils``
- Run ``sudo tar -C /usr/local --strip-components 1 -xJf node-v6.10.1-linux-x64.tar.xz``

### Verify that node is version :

- Run and verify that v6.10.1 : ``node -v``
- Run and verify that 3.10.10 : ``npm -v``


### Change permission, so that you install node package that are global

```
sudo chown -R $(whoami) /usr/local/lib/node_modules/
sudo chown $(whoami) /usr/local/bin
```

### Install Global npm packages 

```
npm install -g grunt-cli
npm install -g jshint
npm install -g nodemon
npm install -g istanbul
```
## To run portfolio

- npm install 
-  
