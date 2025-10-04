DROP TABLE IF EXISTS time_clock;

CREATE TABLE time_clock (
    id SERIAL PRIMARY KEY,
    user_id VARCHAR(50) NOT NULL,
    org_id VARCHAR(50) NOT NULL,
    time_in TIMESTAMP NOT NULL,
    time_out DATE
);

select * from time_clock;