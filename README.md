# Fullstack TODO management application

Autor: Michal Bojkovsky

## Frontend

- zalozeny na `create-react-app`

## Backend

- zalozeny na `express` frameworku a `MongoDB` databaze
- pouziva ORM `mongoose`
- rozdelenie na models (modely a schemy pre DB), routes (API gateway) a consts (konstanty)

## Misc

- FE aj BE pouzivaju `yarn` namiesto `npm` kvoli lepsiemu lockfile manazmentu
- FE aj BE pouzivaju `eslint` a `prettier` na zabezpecenie jednotneho stylu 
- FE aj BE pouzivaju `dotenv` na manazment environment variables
- `scripts/docker-compose.yml` pre vytvorenie docker kontajneru iba s mongoDB databazou pre lokalny vyvoj

## Spustenie

- Pre lokalne spustenie mimo Dockeru treba nakonfigurovat `.env` variables pre FE aj BE - staci premenovat `.env.example`
Nasledne staci v oboch priecinkoch spustit `yarn && yarn start`, avsak je potrebne mat pustene `MongoDB` na default porte 
  (`docker-compose.yml` v scripts priecinku)
- Pre spustenie v dockeri staci spustit `docker compose up`. Nepouzil som `.env` variables priamo z priecinkov, v compose
su dane "natvrdo", pretoze by pri backende aj tak bolo treba `port` variable vediet pocas budovania kontajneru a teda by bolo 
  treba dalsi `.env` pre `docker compose`
