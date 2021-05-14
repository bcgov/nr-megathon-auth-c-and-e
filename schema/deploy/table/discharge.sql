-- Deploy auth-c-and-e:table/discharge to pg

BEGIN;

create table ams_nrced.discharge(
  id int primary key generated always as identity,
  authorization_number int,
  status varchar,
  company varchar,
  authorization_type varchar,
  discharge_type varchar,
  bcenic varchar,
  ems_site varchar,
  comparative_priority_index varchar,
  wdr_regulation varchar,
  wdr_description varchar, 
  facility_description varchar,
  discharge_source varchar,
  discharge_contaminant varchar,
  discharge_min varchar,
  discharge_avg varchar,
  discharge_max varchar,
  discharge_start_date date,
  discharge_end_date date,
  proposed_treatment_disposal varchar,
  administrative_area varchar,
  region varchar,
  regional_district varchar,
  nearest_municipality varchar,
  facility_address varchar,
  latitude numeric,
  longitude numeric,
  issue_date date,
  expiry_date date
);

\copy ams_nrced.discharge(authorization_number,status,company,authorization_type,discharge_type,bcenic,ems_site,comparative_priority_index,wdr_regulation,wdr_description,facility_description,discharge_source,discharge_contaminant,discharge_min,discharge_avg,discharge_max,discharge_start_date,discharge_end_date,proposed_treatment_disposal,administrative_area,region,regional_district,nearest_municipality,facility_address,latitude,longitude,issue_date,expiry_date) FROM '../data/all_ams_discharges.csv' WITH DELIMITER ',' CSV HEADER
update ams_nrced.discharge set longitude = -longitude;

COMMIT;
