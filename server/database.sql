CREATE TABLE users(
    id SERIAL PRIMARY KEY, --WILL ASIGN NEW KEY FOR EVERY USERS
    username VARCHAR(28) NOT NULL UNIQUE, --MAX LENGTH AND UNIQUE
    passhash VARCHAR NOT NULL
);

INSERT INTO users(username, passhash) values($1, $2);