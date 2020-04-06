CREATE TABLE USER (
    idUser int NOT NULL AUTO_INCREMENT,
    nombre varchar(50) NOT NULL,
    nickname varchar(25) NOT NULL,
    password varchar(250) NOT NULL,
    url_photo varchar(250),
    PRIMARY KEY(idUser)
);

CREATE TABLE POST (
    idPost int NOT NULL AUTO_INCREMENT,
    text varchar(10000),
    image_url varcha(250),
    idUser int NOT NULL,
    PRIMARY KEY(idPost),
    FOREIGN KEY(idUser) REFERENCES USER(idUser)
);