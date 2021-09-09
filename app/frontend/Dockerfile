FROM nginx

ADD ./nginx.conf /etc/nginx/nginx.conf

RUN mkdir -p /etc/nginx/ssl

#note that for aws envs, the private key at minimum must be sources from SSM Parameter Store and injected to ecs deployment, over writing this
# 

RUN openssl req -x509 -sha256 -nodes -days 3650 -newkey rsa:2048 -keyout /etc/nginx/ssl/nginx.key -out /etc/nginx/ssl/nginx.crt -subj "/C=AU/ST=VIC/L=Melbourne/O=3Sharp Net /CN=3sharp.net"
RUN openssl dhparam -out /etc/nginx/ssl/dhparam.pem 2040

# RUN apk --no-cache --upgrade add jq openjdk8-jre-base python py-pip groff \
#     && pip install --trusted-host pypi.org --trusted-host files.pythonhosted.org --upgrade awscli==1.14.5 s3cmd==2.0.1 python-magic \
#     && apk -v --purge del py-pip

EXPOSE 80 443

COPY ./build/ /usr/share/nginx/html
# COPY ./scripts/launch.sh /
# COPY ./scripts/config.json.sh /

#STOPSIGNAL SIGTERM

#CMD ["chmod", "+x", "/launch.sh"]
