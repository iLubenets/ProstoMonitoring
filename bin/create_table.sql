CREATE DATABASE monitoring;

-- DROP TABLE event;
CREATE TABLE event
(
  id serial NOT NULL,
  created timestamp without time zone NOT NULL,
  event text NOT NULL,
  level integer NOT NULL,
  registered timestamp without time zone NOT NULL,
  message json,
  CONSTRAINT pk_event_id PRIMARY KEY (id)
);