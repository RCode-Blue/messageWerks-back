CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

CREATE TABLE
    IF NOT EXISTS users(
        id uuid UNIQUE DEFAULT uuid_generate_v4 (),
        PRIMARY KEY (id),
        role SMALLINT NOT NULL,
        email VARCHAR(100) NOT NULL UNIQUE,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL
    );

CREATE RULE users_update AS ON UPDATE TO users  
    WHERE   NEW<>OLD
    DO UPDATE users SET updatedAt=CURRENT_TIMESTAMP
