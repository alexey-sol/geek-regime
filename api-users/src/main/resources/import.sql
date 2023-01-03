-- users

INSERT INTO users (email, created_at, updated_at) VALUES (
    'alexius@mail.com',
    'now'::timestamptz - '1 year'::interval,
    'now'::timestamptz - '1 year'::interval
);

INSERT INTO users (email, created_at, updated_at) VALUES (
    'boobuntu@mail.com',
    'now'::timestamptz - '10 months 23 days'::interval,
    'now'::timestamptz - '10 months'::interval
);

INSERT INTO users (email, created_at, updated_at) VALUES (
    'hel@mail.com',
    'now'::timestamptz - '2 months 12 days'::interval,
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

INSERT INTO users (email, created_at, updated_at) VALUES (
    'zoe@mail.com',
    now(),
    now()
);

-- details

INSERT INTO details (user_id, name, gender, created_at, updated_at)
VALUES (
    1,
    'Alexius',
    'MALE',
    'now'::timestamptz - '1 year'::interval,
    'now'::timestamptz - '1 year'::interval
);

INSERT INTO details (user_id, name, gender, created_at, updated_at)
VALUES (
    2,
    'Boobuntu',
    'MALE',
    'now'::timestamptz - '10 months 23 days'::interval,
    'now'::timestamptz - '10 months'::interval
);

INSERT INTO details (user_id, name, gender, created_at, updated_at)
VALUES (
    3,
    'Hel',
    'FEMALE',
    'now'::timestamptz - '2 months 12 days'::interval,
    'now'::timestamptz - '2 months 12 days'::interval
);

INSERT INTO details (user_id, name, gender, created_at, updated_at)
VALUES (
    4,
    'Bobo',
    'MALE',
    'now'::timestamptz - '3 days'::interval,
    'now'::timestamptz - '2 days 12 hours'::interval
);

INSERT INTO details (user_id, name, gender, created_at, updated_at)
VALUES (
    5,
    'En Zyme',
    'MALE',
    'now'::timestamptz - '5 hours'::interval,
    'now'::timestamptz - '1 hour'::interval
);

INSERT INTO details (user_id, name, gender, created_at, updated_at)
VALUES (
    6,
    'Zoe',
    'FEMALE',
    now(),
    now()
);

-- credentials

INSERT INTO credentials (user_id, hashed_password, salt)
VALUES (1, '\\', '\\');

INSERT INTO credentials (user_id, hashed_password, salt)
VALUES (5, '\\', '\\');
