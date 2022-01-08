# Wordpress Configuration with **composer.json** and **Docker**
## Creating the Wordpress Docker configuration
* Based on on Official wordpress docker container
  * [Wordpress Docker](https://github.com/docker-library/wordpress)
## Wordpress Composer config
- [Composer Config](https://composer.rarst.net)

## MariaDB setup
* [Docker Compose MariaDB](https://onexlab-io.medium.com/docker-compose-mariadb-5eb7a37426a2)

## Setting up Nginx Unit
  - nginx - https://unit.nginx.org/installation/?_ga=2.164349946.45652302.1588254197-1506587029.1585825834#installation-docker
  - php - https://unit.php.net/manual/en/installation.docker.html
## Using Amazon Lightsail instance with Ubuntu as development box

- Setup Docker on Ubuntu
  - https://docs.docker.com/engine/install/ubuntu/
  - https://docs.docker.com/engine/install/linux-postinstall/#manage-docker-as-a-non-root-user
- Run instance of Wordpress with docker

  - `docker-compose up --build`
  - Access server at port 9090

  - Setup System Parameters with AWS
## Github CodeSpaces Setup
* Using [php-mariadb container](https://github.com/microsoft/vscode-dev-containers/tree/v0.209.6/containers/php-mariadb)
* Microsoft VSCode Dev Containers - https://github.com/Microsoft/vscode-dev-containers

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

* Setup
  - /var/www/html/wordpress - location of wordpress config
* In dev container
* Edit apache site config and add 8080 virtual host

```conf
<VirtualHost *:80>
        # The ServerName directive sets the request scheme, hostname and port that
        # the server uses to identify itself. This is used when creating
        # redirection URLs. In the context of virtual hosts, the ServerName
        # specifies what hostname must appear in the request's Host: header to
        # match this virtual host. For the default virtual host (this file) this
        # value is not decisive as it is used as a last resort host regardless.
        # However, you must set it for any further virtual host explicitly.
        #ServerName www.example.com

        ServerAdmin webmaster@localhost
        DocumentRoot /var/www/html/wordpress

        # Available loglevels: trace8, ..., trace1, debug, info, notice, warn,
        # error, crit, alert, emerg.
        # It is also possible to configure the loglevel for particular
        # modules, e.g.
        #LogLevel info ssl:warn

        ErrorLog ${APACHE_LOG_DIR}/error.log
        CustomLog ${APACHE_LOG_DIR}/access.log combined

        # For most configuration files from conf-available/, which are
        # enabled or disabled at a global level, it is possible to
        # include a line for only one particular virtual host. For example the
        # following line enables the CGI configuration for this host only
        # after it has been globally disabled with "a2disconf".
        #Include conf-available/serve-cgi-bin.conf
</VirtualHost>
```
