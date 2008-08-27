-- 
-- Created by SQL::Translator::Producer::SQLite
-- Created on Mon Aug 25 23:19:11 2008
-- 
BEGIN TRANSACTION;


--
-- Table: authors
--
DROP TABLE authors;
CREATE TABLE authors (
  id VARCHAR(128) NOT NULL DEFAULT '',
  display_name VARCHAR(14) NOT NULL DEFAULT NULL,
  PRIMARY KEY (id)
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


--
-- Table: roles
--
DROP TABLE roles;
CREATE TABLE roles (
  id  NOT NULL,
  role  NOT NULL,
  PRIMARY KEY (id)
);


--
-- Table: sessions
--
DROP TABLE sessions;
CREATE TABLE sessions (
  id CHAR(72) NOT NULL,
  session_data TEXT,
  expires INTEGER,
  PRIMARY KEY (id)
);


--
-- Table: users
--
DROP TABLE users;
CREATE TABLE users (
  id  NOT NULL,
  username  NOT NULL,
  password  NOT NULL,
  email_address  NOT NULL,
  first_name  NOT NULL,
  last_name  NOT NULL,
  active  NOT NULL,
  PRIMARY KEY (id)
);

CREATE UNIQUE INDEX users_username_users ON users (username);
CREATE UNIQUE INDEX users_email_address_users ON users (email_address);

--
-- Table: user_authors
--
DROP TABLE user_authors;
CREATE TABLE user_authors (
  user_id  NOT NULL,
  author_id  NOT NULL,
  PRIMARY KEY (user_id, author_id)
);


--
-- Table: user_roles
--
DROP TABLE user_roles;
CREATE TABLE user_roles (
  user_id  NOT NULL,
  role_id  NOT NULL,
  PRIMARY KEY (user_id, role_id)
);


COMMIT;
