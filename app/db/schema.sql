DROP DATABASE IF EXISTS mixuptape_db;
CREATE DATABASE mixuptape_db;

USE mixuptape_db;

-- password data goes here?
CREATE TABLE usertable (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  username varchar(30) NOT NULL
);


CREATE TABLE playlisttable (
  id int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  usertable_id  INTEGER,
--   super long text here 
  playliststring varchar(255) NOT NULL,
  FOREIGN KEY (usertable_id) REFERENCES usertable(id)
);


CREATE TABLE upvote (
  playlisttable_id  INTEGER,
  usertable_id  INTEGER,
  upvote boolean,
  FOREIGN KEY (playlisttable_id) REFERENCES playlisttable(id),
  FOREIGN KEY (usertable) REFERENCES usertable(id)
);
