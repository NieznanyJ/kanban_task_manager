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
    taskId NUMERIC PRIMARY KEY,
    boardId VARCHAR(255),
    board VARCHAR(255),
    username VARCHAR(255),
    title VARCHAR(255),
    description VARCHAR(255),
    subtasks TEXT[],
    status VARCHAR(255)
);

CREATE TABLE users (
    username VARCHAR(255) PRIMARY KEY,
    hashed_password VARCHAR(255)
);
