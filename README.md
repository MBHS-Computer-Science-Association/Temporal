[![Build Status](https://travis-ci.org/MBHS-Computer-Science-Association/Temporal.svg?branch=master)](https://travis-ci.org/MBHS-Computer-Science-Association/Temporal)

# Temporal
Because knowledge is temporal, but with us, it's not.

Testing app is live as a Heroku app [here](http://temporal-testing.herokuapp.com/).

Testing app for UI branch is live as a Heroku app [here](https://temporal-testing-ui.herokuapp.com/).

## Prerequisites
* Node.js (and NPM)
* PostgreSQL 9.6

## Installation

1. Create a PostgreSQL database.
2. Run `psql temporal_psql_database_name < sessions.sql` to create a necessary table for Temporal's session handling.
