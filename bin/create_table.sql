CREATE DATABASE monitoring;

CREATE TABLE event
(
  id serial NOT NULL,
  "create" timestamp without time zone,
  type text,
  "time" timestamp without time zone,
  data json,
  CONSTRAINT pk_event_id PRIMARY KEY (id)
);