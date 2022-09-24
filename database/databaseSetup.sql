-- @block
CREATE TABLE IF NOT EXISTS 'topics' (
    'id' int NOT NULL AUTO_INCREMENT,
    'topicName' varchar(255) NOT NULL,
    'topicDescription' varchar(255) NOT NULL,
    PRIMARY KEY ( 'id' )
)
CREATE TABLE IF NOT EXISTS 'posts'(
    'id' int NOT NULL AUTO_INCREMENT,
    'topicId' int NOT NULL,
    'postName' VARCHAR(255) NOT NULL,
    'postText' TEXT NOT NULL,
    'author' VARCHAR(255) NOT NULL,
    'creationDate' VARCHAR(20) NOT NULL,
    PRIMARY KEY ( 'id' ), FOREIGN KEY ( 'topicId' ) REFERENCES 'topics' ( 'id' )
)