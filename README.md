docker run -d --name=biblioteca-mysql -e MYSQL_ROOT_PASSWORD=1q2w3e4r -p 3306:3306 mysql:8 --default-authentication-plugin=mysql_native_password


mysql -h 127.0.0.1 -P 3306 -uroot -p
