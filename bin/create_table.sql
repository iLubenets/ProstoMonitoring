CREATE DATABASE monitoring;

-- DROP TABLE event;
CREATE TABLE event
(
  id serial NOT NULL,
  created timestamp without time zone,
  event text,
  registered timestamp without time zone,
  message json,
  CONSTRAINT pk_event_id PRIMARY KEY (id)
);