-- @block
CREATE TABLE IF NOT EXISTS topics (
    id int NOT NULL AUTO_INCREMENT,
    topicName varchar(255) NOT NULL,
    topicDescription varchar(255) NOT NULL,
    PRIMARY KEY ( id )
);
--@block
CREATE TABLE IF NOT EXISTS posts(
    id int NOT NULL AUTO_INCREMENT,
    topicId int NOT NULL,
    postName VARCHAR(255) NOT NULL,
    postText TEXT NOT NULL,
    author VARCHAR(255) NOT NULL DEFAULT 'Anonimous',
    creationDate VARCHAR(20) NOT NULL,
    PRIMARY KEY (id), FOREIGN KEY (topicId) REFERENCES topics (id)
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
CREATE TABLE IF NOT EXISTS logo(
    id INT NOT NULL AUTO_INCREMENT,
    topicId INT NOT NULL,
    logoName VARCHAR(255) NOT NULL,
    logoPath TEXT NOT NULL,
    
)