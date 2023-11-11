CREATE DATABASE kanban;

CREATE TABLE boards (
    id VARCHAR(255) PRIMARY KEY,
    username VARCHAR(255),
    title VARCHAR(255),
    columns TEXT[]
); 

CREATE TABLE columns (
    board VARCHAR(255) PRIMARY KEY,
    title VARCHAR(255),
    task TEXT[]
);

CREATE TABLE tasks (
    board VARCHAR(255) PRIMARY KEY,
    column_name VARCHAR(255),
    title VARCHAR(255),
    subtask TEXT[]
);

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
