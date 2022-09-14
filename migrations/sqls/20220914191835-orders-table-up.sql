CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status_id BIGINT NOT NULL REFERENCES statuses(id),
    user_id BIGINT NOT NULL REFERENCES users(id)
);