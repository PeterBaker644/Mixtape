DROP DATABASE IF EXISTS MixUpTape_db;
CREATE DATABASE MixUpTape_db;

USE MixUpTape_db;

-- password data goes here?
CREATE TABLE UserTable (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userName varchar(30) NOT NULL
);


CREATE TABLE PlaylistTable (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  UserTable_id  INTEGER,
--   super long text here 
  playlistString varchar(255) NOT NULL,
  FOREIGN KEY (UserTable_id) REFERENCES UserTable(id)
);


CREATE TABLE Upvote (
  PlaylistTable_id  INTEGER,
  UserTable_id  INTEGER,
  Upvote boolean,
  FOREIGN KEY (PlaylistTable_id) REFERENCES PlaylistTable(id),
  FOREIGN KEY (UserTable_id) REFERENCES UserTable(id)
);
