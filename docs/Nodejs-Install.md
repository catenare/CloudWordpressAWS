* Need *NodeJS* for *TypeScript* when running *AWS CDK* scripts.
## Setup up Node JS on Lightsail Instance
* Resource: [Node JS Installation on Linux](https://github.com/nodejs/help/wiki/Installation)
* Using: *v16.6.1*
* Download archive: `wget https://nodejs.org/dist/v16.6.1/node-v16.6.1-linux-x64.tar.xz`
```sh
VERSION=v16.6.1
DISTRO=linux-x64
sudo mkdir -p /usr/local/lib/nodejs
sudo tar -xJvf node-$VERSION-$DISTRO.tar.xz -C /usr/local/lib/nodejs 
```
* Update *~/.profile*
```sh
VERSION=v16.6.1
DISTRO=linux-x64
export PATH=/usr/local/lib/nodejs/node-$VERSION-$DISTRO/bin:$PATH
```sh
* Update ~/.bashrc
```sh
. ~/.bashrc
```
* Test installation
```sh
node -v
npm 
```