-- Deploy auth-c-and-e:table/nrced to pg
-- requires: schema

BEGIN;

create table ams_nrced.nrced_json(
  id serial primary key,
  record jsonb
);

create temporary table temp(json_data jsonb) on commit drop;
\copy temp(json_data) from program 'sed ''s/\\/\\\\/g'' < ../data/nrced_0_9999.json | tr -d ''\n''';

INSERT INTO ams_nrced.nrced_json(record) 
select jsonb_array_elements(json_data) FROM temp;


delete from temp;
\copy temp(json_data) from program 'sed ''s/\\/\\\\/g'' < ../data/nrced_10000_19999.json | tr -d ''\n''';

INSERT INTO ams_nrced.nrced_json(record) 
select jsonb_array_elements(json_data) FROM temp;


delete from temp;
\copy temp(json_data) from program 'sed ''s/\\/\\\\/g'' < ../data/nrced_20000_26881.json | tr -d ''\n''';

INSERT INTO ams_nrced.nrced_json(record) 
select jsonb_array_elements(json_data) FROM temp;


COMMIT;
