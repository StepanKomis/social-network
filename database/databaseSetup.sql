-- @block
CREATE TABLE IF NOT EXISTS topics (
    id int NOT NULL AUTO_INCREMENT,
    topicName varchar(255) NOT NULL,
    topicDescription TEXT NOT NULL,
    addressName VARCHAR(255) NOT NULL UNIQUE,
    PRIMARY KEY ( id )
);
--@block
CREATE TABLE IF NOT EXISTS posts(
    id int NOT NULL AUTO_INCREMENT,
    topicName VARCHAR(255) NOT NULL,
    postName VARCHAR(255) NOT NULL,
    postText TEXT NOT NULL,
    author VARCHAR(255) NOT NULL DEFAULT 'Anonimous',
    creationDate VARCHAR(20) NOT NULL,
    PRIMARY KEY (id)
);
--@block
CREATE TABLE IF NOT EXISTS comments(
    id INT NOT NULL AUTO_INCREMENT,
    postId int NOT NULL,
    commentText TEXT NOT NULL,
    comentAuthor VARCHAR(255) NOT NULL,
    PRIMARY KEY ( id ), FOREIGN KEY (postId) REFERENCES posts (id)
);
--@block
CREATE TABLE IF NOT EXISTS media(
    id int NOT NULL AUTO_INCREMENT,
    mediaPost INT,
    mediaAuthor VARCHAR(255) NOT NULL,
    mediaPath TEXT NOT NULL,
    PRIMARY KEY ( id ), FOREIGN KEY (mediaPost) REFERENCES posts (id), FOREIGN KEY (mediaPost) REFERENCES comments (id)
);

--@block

DROP DATABASE IF exists socialNetwork;

--@block
DROP TABLE topics;

--@block
INSERT INTO posts (postName, postText, author, topicName, creationDate) 
VALUES (
    "first post",
    "this is very long text",
    
);
--@block
SELECT id FROM posts WHERE postName = "first";

--@block
SELECT * FROM posts;

--@block
SELECT * FROM posts WHERE topicName = "testingtopic" AND id = 17