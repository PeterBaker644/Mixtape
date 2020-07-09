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
  user_id  INTEGER,
--   super long text here 
  playlist_string varchar(255) NOT NULL,
  FOREIGN KEY (user_id) REFERENCES user(id)
);


CREATE TABLE vote (
  playlist_id  INTEGER,
  user_id  INTEGER,
  upvote boolean,
  FOREIGN KEY (playlist_id) REFERENCES playlist(id),
  FOREIGN KEY (user_id) REFERENCES user(id)
);

-- This file is not necessary as sequelize creates all tables automatically, but it is useful for visualization. It also no longer reflects the structure of the tables that are being authored by sequelize as defined in our user, playlist, and vote methods.