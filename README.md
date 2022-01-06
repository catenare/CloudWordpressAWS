# Wordpress Configuration with **composer.json** and **Docker**

- Guide: https://composer.rarst.net
* Install Composer
    * `wget https://raw.githubusercontent.com/composer/getcomposer.org/baa8937c704cdbf8982a2456f939363b82da0985/web/installer -O - -q | php -- --quiet`
    * `

## Using Amazon Lightsail instance with Ubuntu as development box

- Setup Docker on Ubuntu
  - https://docs.docker.com/engine/install/ubuntu/
  - https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user
- Run instance of Wordpress with docker

  - `docker-compose up --build`
  - Access server at port 9090

  - Setup System Parameters with AWS

  ## Setting up a dev container for PHP development using Github Codespaces

  - Default - php & mariadb
  - Add fpm as an option (going to use nginx as the web server)
    - FPM container - https://github.com/docker-library/wordpress/blob/fbc4dd7593dd0cf7a239348cb7ebcdcbf505286f/latest/php8.1/fpm/Dockerfile
  - nginx - https://unit.nginx.org/installation/?_ga=2.164349946.45652302.1588254197-1506587029.1585825834#installation-docker
  - php - https://unit.php.net/manual/en/installation.docker.html
  - Microsoft VSCode Dev Containers - https://github.com/Microsoft/vscode-dev-containers

  ### Task list

  - Composer file
  - nginx unit
  - php
  - Wordpress
  - MariaDB
  - Install nginx unit - https://unit.nginx.org
  - Setup mariadb
  -

  ### Setup Wordpress with nginx unit

  - https://www.nginx.com/blog/automating-installation-wordpress-with-nginx-unit-on-ubuntu/
  - https://nucker.me/how-to-host-a-wordpress-site-in-docker-with-nginx/
  - https://appwrk.com/how-to-set-up-dockerizing-wordpress-with-nginx-web-server
  - Unit Wordpress - https://github.com/tippexs/unitwp
  - https://www.dmuth.org/wordpress-5-in-docker-with-nginx-and-letsencrypt/
  - https://medium.com/swlh/wordpress-deployment-with-nginx-php-fpm-and-mariadb-using-docker-compose-55f59e5c1a
  - https://www.digitalocean.com/community/tutorials/how-to-install-wordpress-with-docker-compose

  ### Setup Composer.json

  - https://docs.platform.sh/guides/wordpress/composer/migrate.html


* Test Server
* `sudo service apache2 start`
* `sudo sevice apache2 stop`

* Set environment variables
* `set -a; source .env; set +a`