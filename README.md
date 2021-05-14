# nr-megathon-auth-c-and-e

Prerequesites:

- install cpanminus: `cpan App::cpanminus`
- install sqitch & postgres connector: `cd schema; cpanm --installdeps .`

Data deployment:

- create postgres DB `createdb ams_nrced`
- deploy: `cd schema; sqitch deploy`

Start API:

- install [postgrest](https://postgrest.org/en/stable/tutorials/tut0.html#step-3-install-postgrest)
- from repo root, run `postgrest api.conf`

Start FE:
- cd /frontend
- npm install
- npm start
