-- Deploy auth-c-and-e:table/nrced to pg
-- requires: schema

BEGIN;

create table ams_nrced.nrced(
  id serial primary key,
  name varchar,
  type varchar,
  date_issued date,
  issued_to varchar,
  summary varchar,
  issuing_agency varchar,
  legislation_act varchar,
  regulation varchar,
  section varchar,
  sub_section varchar,
  paragraph varchar,
  description varchar,
  offence varchar,
  penalties varchar,
  site_project varchar,
  location varchar,
  latitude float,
  longitude float,
  authorization_id int
);

\COPY ams_nrced.nrced(name,type,date_issued,issued_to,summary,issuing_agency,legislation_act,regulation,section,sub_section,paragraph,description,offence,penalties,site_project,location,latitude,longitude) FROM '../data/nrced-export-2021-05-13_company.csv' with DELIMITER ',' CSV HEADER;

COMMIT;
