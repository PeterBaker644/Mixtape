USE MixTape_db;


INSERT INTO users (id, first_name, last_name, email, role, username, password, last_login, createdAt, updatedAt)
VALUES (id, 'first_name', 'last_name', 'email', 'user', 'username', 'password', 
'2020-07-09 23:07:58', '2020-07-09 23:07:58', '2020-07-09 23:07:58');


INSERT INTO playlists (id, title, string, createdAt, updatedAt, UserId)
VALUES (1,'title', 'songone, song2', '2020-07-09 23:07:58','2020-07-09 23:07:58',1);


INSERT INTO votes (id, upvote, createdAt, updatedAt, UserId, PlaylistId)
VALUES (1,1, '2020-07-09 23:07:58', '2020-07-09 23:07:58',1,1);
