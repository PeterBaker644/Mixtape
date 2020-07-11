-- if force true is in the server.js for the sequelize function you will need to add dummy data
-- to test with, run this code in workbench to quickly get something put in


USE mixtape_db;

INSERT INTO users (id, first_name, last_name, email, role, username, password, last_login, createdAt, updatedAt)
VALUES 
    ('1', 'Peter', 'Baker', 'baker644@umn.edu', 'user', 'baker644', '$argon2i$v=19$m=4096,t=3,p=1$13ADFWBoE1IfLnLYthgEOQ$Bx49JkVO9ZFq3rbtQAJbsOtwCCJCHyJ40aL6VM9PV00', NULL, '2020-07-11 01:07:53', '2020-07-11 01:07:53'),
    ('2', 'Gene', 'Shaver', 'Gene@theguy.com', 'user', 'Gene123', '$argon2i$v=19$m=4096,t=3,p=1$o6U4v3HvDJhD6fhHKtYfMg$il9hu6Hm+Ykd4juDbvG3nYR4dnQ5bjF8YvCAxypV/ms', NULL, '2020-07-11 01:10:32', '2020-07-11 01:10:32'),
    ('3', 'Vanya', 'Lukovich', 'vayna234@whatever.com', 'user', 'vanya234', '$argon2i$v=19$m=4096,t=3,p=1$Q0YvBlS0/uaQbqJv4IOKYQ$c24CeKl14xabEPHzLj9JrIT7MEiHrUqwyovBrNX5xhQ', NULL, '2020-07-11 01:12:20', '2020-07-11 01:12:20');

INSERT INTO playlists (id, title, string, createdAt, updatedAt, UserId)
VALUES 
	(1,'title', 'songone, song2', '2020-07-09 23:07:58','2020-07-09 23:07:58',1),
    (2,'title', 'songone, song2', '2020-07-09 23:07:58','2020-07-09 23:07:58',2),
    (3,'My Really Great One', 'Perfect Day, Sinnerman','2020-07-09 23:07:58','2020-07-09 23:07:58',1);

INSERT INTO votes (id, upvote, createdAt, updatedAt, UserId, PlaylistId)
VALUES 
	(id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,1), 
    (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,2), 
    (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',2,1);

INSERT INTO songs (id, song_title, song_artist,createdAt, updatedAt)
VALUES 
	(id,'Imperial March','John Williams', '2020-07-09 23:07:58','2020-07-09 23:07:58'), 
    (id,'Olympic Theme','John Williams', '2020-07-09 23:07:58','2020-07-09 23:07:58'), 
    (id,'Procession of the Nobles','some old guy', '2020-07-09 23:07:58','2020-07-09 23:07:58');

INSERT INTO playlist_song_junction_table (createdAt, updatedAt,PlaylistId, SongId)
VALUES 
	('2020-07-09 23:07:58','2020-07-09 23:07:58',1,1), 
	('2020-07-09 23:07:58','2020-07-09 23:07:58',1,2);

INSERT INTO playlist_song_junction_table (createdAt, updatedAt,PlaylistId, SongId)
VALUES 
	('2020-07-09 23:07:58','2020-07-09 23:07:58',2,1), 
	('2020-07-09 23:07:58','2020-07-09 23:07:58',2,2), 
	('2020-07-09 23:07:58','2020-07-09 23:07:58',2,3);