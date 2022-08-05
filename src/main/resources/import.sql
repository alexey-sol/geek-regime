-- users

INSERT INTO users (email, created_at) VALUES (
    'alexius@mail.com',
    'now'::timestamptz - '1 year'::interval
);

INSERT INTO users (email, created_at, updated_at) VALUES (
    'boobuntu@mail.com',
    'now'::timestamptz - '10 months 23 days'::interval,
    'now'::timestamptz - '10 months'::interval
);

INSERT INTO users (email, created_at) VALUES (
    'hel@mail.com',
    'now'::timestamptz - '2 months 12 days'::interval
);

INSERT INTO users (email, created_at, updated_at) VALUES (
    'bobo@mail.com',
    'now'::timestamptz - '3 days'::interval,
    'now'::timestamptz - '2 days 12 hours'::interval
);

INSERT INTO users (email, created_at, updated_at) VALUES (
    'enzyme@mail.com',
    'now'::timestamptz - '5 hours'::interval,
    'now'::timestamptz - '1 hour'::interval
);

INSERT INTO users (email, created_at) VALUES (
    'zoe@mail.com',
    now()
);

-- details

INSERT INTO details (user_id, name, gender)
VALUES (1, 'Alexius', 'MALE');

INSERT INTO details (user_id, name, gender)
VALUES (2, 'Boobuntu', 'MALE');

INSERT INTO details (user_id, name, gender)
VALUES (3, 'Hel', 'FEMALE');

INSERT INTO details (user_id, name, gender)
VALUES (4, 'Bobo', 'MALE');

INSERT INTO details (user_id, name, gender)
VALUES (5, 'En Zyme', 'MALE');

INSERT INTO details (user_id, name, gender)
VALUES (6, 'Zoe', 'FEMALE');

-- credentials

INSERT INTO credentials (user_id, hashed_password, salt)
VALUES (1, '\\', '\\');

INSERT INTO credentials (user_id, hashed_password, salt)
VALUES (5, '\\', '\\');
