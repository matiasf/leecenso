# Tasks schema
 
# --- !Ups

CREATE SEQUENCE question_id_seq;
CREATE TABLE question (
    id integer NOT NULL AUTO_INCREMENT,
    question varchar(255)
);
 
# --- !Downs
 
DROP TABLE question;
DROP SEQUENCE question_id_seq;