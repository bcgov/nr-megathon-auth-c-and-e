# nr-megathon-auth-c-and-e

Prerequesites:

- install cpanminus: `cpan App::cpanminus`
- install sqitch & postgres connector: `cpanm --installdeps .`

Data deployment:

- create postgres DB `createdb ams_nrced`
- deploy: `cd schema; sqitch deploy`
