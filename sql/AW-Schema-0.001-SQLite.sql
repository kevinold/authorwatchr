-- 
-- Created by SQL::Translator::Producer::SQLite
-- Created on Wed Aug 27 14:22:49 2008
-- 
BEGIN TRANSACTION;


--
-- Table: authors
--
DROP TABLE authors;
CREATE TABLE authors (
  id varchar(128) NOT NULL,
  display_name varchar(128) NOT NULL,
  PRIMARY KEY (id)
);


--
-- Table: authors_orig
--
DROP TABLE authors_orig;
CREATE TABLE authors_orig (
  id INTEGER PRIMARY KEY NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL
);


--
-- Table: books
--
DROP TABLE books;
CREATE TABLE books (
  id INTEGER PRIMARY KEY NOT NULL DEFAULT '',
  isbn VARCHAR(14) NOT NULL DEFAULT '',
  title VARCHAR(255) NOT NULL DEFAULT '',
  author_id VARCHAR(128) NOT NULL DEFAULT '',
  release_date DATE NOT NULL DEFAULT '',
  publish_date DATE NOT NULL DEFAULT '',
  pre_order BOOLEAN(1) NOT NULL DEFAULT '',
  admin_active BOOLEAN(1) NOT NULL DEFAULT '1',
  admin_valid boolean(1) NOT NULL DEFAULT '1'
);

CREATE UNIQUE INDEX books_isbn_books02 ON books (isbn);

--
-- Table: roles
--
DROP TABLE roles;
CREATE TABLE roles (
  id INTEGER PRIMARY KEY NOT NULL,
  role varchar(50) NOT NULL
);


--
-- Table: sessions
--
DROP TABLE sessions;
CREATE TABLE sessions (
  id varchar(72) NOT NULL DEFAULT '',
  session_data text,
  expires integer DEFAULT NULL,
  PRIMARY KEY (id)
);


--
-- Table: user_authors
--
DROP TABLE user_authors;
CREATE TABLE user_authors (
  user_id integer NOT NULL,
  author_id varchar(128) NOT NULL,
  PRIMARY KEY (user_id, author_id)
);


--
-- Table: user_roles
--
DROP TABLE user_roles;
CREATE TABLE user_roles (
  user_id integer NOT NULL,
  role_id integer NOT NULL,
  PRIMARY KEY (user_id, role_id)
);


--
-- Table: users
--
DROP TABLE users;
CREATE TABLE users (
  id INTEGER PRIMARY KEY NOT NULL,
  username varchar(50) NOT NULL,
  password varchar(50) NOT NULL,
  email_address varchar(255) NOT NULL,
  first_name varchar(50) NOT NULL,
  last_name varchar(50) NOT NULL,
  active varchar(255) NOT NULL,
  status varchar(255) NOT NULL
);

CREATE UNIQUE INDEX users_username_users02 ON users (username);
CREATE UNIQUE INDEX users_email_address_users02 ON users (email_address);

COMMIT;
