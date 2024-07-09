###### 使用docker部署mysql 到服务器



docker exec -it mingxie-mysql bash



docker run --name mingxie-mysql -p 3306:3306 -e MYSQL_ROOT_PASSWORD=chai1234 -d mysql:5.7


mysql -u root -p
