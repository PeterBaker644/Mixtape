DROP DATABASE IF EXISTS mixtape_db;
CREATE DATABASE mixtape_db;

USE mixtape_db;

-- password data goes here?
CREATE TABLE user (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(30) NOT NULL
);


CREATE TABLE playlist (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  UserTable_id  INTEGER,
--   super long text here 
  playlistString varchar(255) NOT NULL,
  FOREIGN KEY (UserTable_id) REFERENCES UserTable(id)
);


CREATE TABLE upvote (
  PlaylistTable_id  INTEGER,
  UserTable_id  INTEGER,
  Upvote boolean,
  FOREIGN KEY (PlaylistTable_id) REFERENCES PlaylistTable(id),
  FOREIGN KEY (UserTable_id) REFERENCES UserTable(id)
);
