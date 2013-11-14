CREATE DATABASE prosto.monitoring;

-- DROP TABLE default_event;
CREATE TABLE default_event
(
  id serial NOT NULL,
  created timestamp without time zone NOT NULL,
  event text NOT NULL,
  registered timestamp without time zone NOT NULL,
  level integer,
  message text,
  data json,
  CONSTRAINT pk_default_event_id PRIMARY KEY (id)
);

-- DROP TABLE exception_event;
CREATE TABLE exception_event
(
  id serial NOT NULL,
  created timestamp without time zone NOT NULL,
  event text NOT NULL,
  registered timestamp without time zone NOT NULL,
  class text,
  message text,
  file text,
  line integer,
  data json,
  CONSTRAINT pk_exception_event_id PRIMARY KEY (id)
);