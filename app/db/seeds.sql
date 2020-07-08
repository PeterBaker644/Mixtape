USE MixUpTape_db;

-- VALUES (id, username);
INSERT INTO UserTable 
VALUES (1, 'PeterUsername');
INSERT INTO UserTable 
VALUES (2, 'Gshaver82');
INSERT INTO UserTable 
VALUES (3, 'simeonUsername');


-- VALUES (id,UserTable_id(who created the post), playlistString);
INSERT INTO PlaylistTable 
VALUES (1, 1,"songOne songTwo");
INSERT INTO PlaylistTable 
VALUES (2, 1,"songOne songThree");

-- VALUES (PlaylistTable_id,UserTable_id,Upvote);
INSERT INTO Upvote 
VALUES (1,1,true);
INSERT INTO Upvote 
VALUES (2,1,true);

INSERT INTO Upvote 
VALUES (1,2,true);
INSERT INTO Upvote 
VALUES (2,2,false);

INSERT INTO Upvote 
VALUES (1,3,true);
