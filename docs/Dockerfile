FROM onesheep/docs

VOLUME /var/www/html

COPY docs/ /var/www/html/

STOPSIGNAL SIGQUIT

ENTRYPOINT ["/run.sh"]