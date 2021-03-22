# Web

[![Build](https://github.com/aiir-logi/web/actions/workflows/gradle.yml/badge.svg)](https://github.com/aiir-logi/web/actions/workflows/gradle.yml) [![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=aiir-logi_web&metric=alert_status)](https://sonarcloud.io/dashboard?id=aiir-logi_web) 

### Requirements
* Java 11
* Node 14 (with npm)
* Postgres ( can be run with `docker run -d --rm -it --name pg -e "POSTGRES_PASSWORD=postgres" -p 5432:5432 postgres:12`)

### Setup
1. Run `npm install`
2. Run backend (via IDE or `./gradlew run`)
3. Run frontend (via IDE or `ng serve`)

### Work
* backend will be available at `http://localhost:9090`
* frontend will be available at `http://localhost:4200`
