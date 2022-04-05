CREATE TABLE
    IF NOT EXISTS admins(
        id SERIAL,
        role SMALLINT NOT NULL,
        email VARCHAR(100) NOT NULL,
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        slug VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP
        ON
        UPDATE
            CURRENT_TIMESTAMP,
            PRIMARY KEY(id)
    )
