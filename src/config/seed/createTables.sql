CREATE TABLE
    IF NOT EXISTS users(
        id SERIAL,
        role SMALLINT NOT NULL,
        email VARCHAR(100) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT NULL,
        PRIMARY KEY(id)
    );

CREATE RULE users_update AS ON UPDATE TO users  
    WHERE   NEW<>OLD
    DO UPDATE users SET updatedAt=CURRENT_TIMESTAMP
