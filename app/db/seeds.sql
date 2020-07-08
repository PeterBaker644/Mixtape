USE mixuptape_db;

-- VALUES (id, username);
INSERT INTO usertable 
VALUES (1, 'PeterUsername');
INSERT INTO usertable 
VALUES (2, 'Gshaver82');
INSERT INTO usertable 
VALUES (3, 'simeonUsername');


-- VALUES (id,UserTable_id(who created the post), playlistString);
INSERT INTO playlisttable 
VALUES (1, 1,"songOne songTwo");
INSERT INTO playlisttable 
VALUES (2, 1,"songOne songThree");

-- VALUES (PlaylistTable_id,usertable,upvote);
INSERT INTO upvote 
VALUES (1,1,true);
INSERT INTO upvote 
VALUES (2,1,true);

INSERT INTO upvote 
VALUES (1,2,true);
INSERT INTO upvote 
VALUES (2,2,false);

INSERT INTO upvote 
VALUES (1,3,true);
