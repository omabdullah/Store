
CREATE DATABASE IF NOT EXISTS store;

USE store;

ALTER USER 'noble'@'%' IDENTIFIED WITH mysql_native_password BY 'pass';

CREATE USER 'saifali'@'%' IDENTIFIED BY 'password';
CREATE USER 'frank'@'%' IDENTIFIED BY 'password';
CREATE USER 'osama'@'%' IDENTIFIED BY 'password';

GRANT ALL PRIVILEGES ON store . * TO 'noble'@'%';
GRANT ALL PRIVILEGES ON store . * TO 'saifali'@'%';
GRANT ALL PRIVILEGES ON store . * TO 'frank'@'%';
GRANT ALL PRIVILEGES ON store . * TO 'osama'@'%';

flush privileges;

CREATE TABLE product (
    id INT(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(100) NOT NULL,
    description VARCHAR(200),
    price DECIMAL(5,2),
    quantity INT(3),
    threshold INT(3)
);