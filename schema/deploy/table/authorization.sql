-- Deploy auth-c-and-e:table/authorization to pg

BEGIN;

create table ams_nrced.authorization(
  id int primary key generated always as identity,
  authorization_number int,
  authorization_type varchar(1000),
  company varchar(1000),
  issue_date date,
  expiry_date date,
  waste_type varchar(1000),
  authorization_state varchar(1000),
  primary_bcenicid varchar(1000),
  secondary_bcenicid varchar(1000),
  cpix varchar(1000),
  risk_level varchar(1000) ,
  wdr_regulation varchar(1000) ,
  wdr_schedule varchar(1000), 
  regional_case_manager varchar(1000),
  office varchar(1000),
  administrative_area varchar(1000),
  regional_district varchar(1000),
  region varchar(1000),
  nearest_municipality varchar(1000),
  facility_description varchar(10000),
  facility_address varchar(1000),
  facility_operator varchar(1000) ,
  facility_operator_phone varchar(1000),
  facility_operator_email varchar(1000),
  latitude numeric,
  longitude numeric,
  legal_land_description varchar(10000), 
  mailing_address varchar(1000)
);

\copy ams_nrced.authorization(authorization_number, authorization_type, company, issue_date, expiry_date, waste_type, authorization_state, primary_bcenicid, secondary_bcenicid,  cpix,  risk_level,  wdr_regulation,  wdr_schedule,  regional_case_manager,  office, administrative_area, regional_district,region,nearest_municipality,facility_description,facility_address,facility_operator,facility_operator_phone,facility_operator_email, latitude, longitude, legal_land_description, mailing_address) FROM '../data/all_ams_authorizations.csv' WITH DELIMITER ',' CSV HEADER
update ams_nrced.authorization set longitude = -longitude;


COMMIT;
