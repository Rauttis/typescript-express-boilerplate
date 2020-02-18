## Dev
Start with `docker-compose up`.
Code changes are loaded into the container automatically. If packages change rebuild the image with `docker-compose build` or `docker-compose up --build`

### Run tests
`docker-compose run --rm typescript-express-app npm test`
### Run lint
`docker-compose run --rm typescript-express-app npm run lint`

## Prod
Build prod image with `docker-compose -f docker-compose.yml build`
