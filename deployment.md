# Deployment

## UI folder
https://github.com/mgechev/angular-seed/wiki/Deploying-prod-build-to-Apache-2

## webapi folder:
https://docs.microsoft.com/en-us/aspnet/core/publishing/apache-proxy

# One time configuration

## Reverse Proxy Apache to Kestrel

May not need all of these:

	a2enmod rewrite
	a2enmod proxy
	a2enmod proxy_http
	a2enmod ssl
	a2enmod proxy
	a2enmod proxy_balancer
	a2enmod proxy_http

Add to Apache <VirtualHost *:443>:

	ProxyPreserveHost On
	ProxyPass /x/ http://127.0.0.1:5000/
	ProxyPassReverse /x/ http://127.0.0.1:5000/
