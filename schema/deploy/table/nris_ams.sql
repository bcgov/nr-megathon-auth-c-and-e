-- Deploy auth-c-and-e:table/nris_ams to pg

BEGIN;

create table ams_nrced.nris_ams(
  nris_id int,
  ams_raw_authorization_id varchar,
  ams_authorization_id int
);

\COPY ams_nrced.nris_ams(nris_id,ams_raw_authorization_id) FROM '../data/nris_ams.csv' WITH DELIMITER ',' CSV HEADER;

COMMIT;
