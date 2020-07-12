USE mixtape_db;


INSERT INTO users (id, first_name, last_name, email, role, username, password, last_login, createdAt, updatedAt)
VALUES (id, 'first_name', 'last_name', 'email@gmail.com', 'user', 'username', 'password', 
'2020-07-09 23:07:58', '2020-07-09 23:07:58', '2020-07-09 23:07:58');
INSERT INTO users (id, first_name, last_name, email, role, username, password, last_login, createdAt, updatedAt)
VALUES (id, 'jim', 'bob', 'jimbobemail@gmail.com', 'user', 'bob', 'asdf', 
'2020-07-09 23:07:58', '2020-07-09 23:07:58', '2020-07-09 23:07:58');


INSERT INTO playlists (id, title, string, createdAt, updatedAt, UserId)
VALUES (1,'title', 'songone, song2', '2020-07-09 23:07:58','2020-07-09 23:07:58',1);
INSERT INTO playlists (id, title, string, createdAt, updatedAt, UserId)
VALUES (2,'secondplaylist', 'songone, song2', '2019-07-09 23:07:58','2020-07-09 23:07:58',2);


INSERT INTO votes (id, upvote, createdAt, updatedAt, UserId, PlaylistId)
VALUES (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,1);
INSERT INTO votes (id, upvote, createdAt, updatedAt, UserId, PlaylistId)
VALUES (id,-1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,2);
INSERT INTO votes (id, upvote, createdAt, updatedAt, UserId, PlaylistId)
VALUES (id,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',2,1);

INSERT INTO songs (id, song_title, song_artist,createdAt, updatedAt)
VALUES (id,'Imperial March','John Williams', '2020-07-09 23:07:58','2020-07-09 23:07:58');
INSERT INTO songs (id, song_title, song_artist,createdAt, updatedAt)
VALUES (id,'Olympic Theme','John Williams', '2020-07-09 23:07:58','2020-07-09 23:07:58');
INSERT INTO songs (id, song_title, song_artist,createdAt, updatedAt)
VALUES (id,'Procession of the Nobles','some old guy', '2020-07-09 23:07:58','2020-07-09 23:07:58');

INSERT INTO playlist_song_junction_table (createdAt, updatedAt,PlaylistId, SongId)
VALUES ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,1);
INSERT INTO playlist_song_junction_table (createdAt, updatedAt,PlaylistId, SongId)
VALUES ('2020-07-09 23:07:58','2020-07-09 23:07:58',1,2);

INSERT INTO playlist_song_junction_table (song_order, createdAt, updatedAt,PlaylistId, SongId)
VALUES (3,'2020-07-09 23:07:58','2020-07-09 23:07:58',2,1);
INSERT INTO playlist_song_junction_table (song_order, createdAt, updatedAt,PlaylistId, SongId)
VALUES (2,'2020-07-09 23:07:58','2020-07-09 23:07:58',2,2);
INSERT INTO playlist_song_junction_table (song_order, createdAt, updatedAt,PlaylistId, SongId)
VALUES (1,'2020-07-09 23:07:58','2020-07-09 23:07:58',2,3);




