# Read Me

This repository contains source codes, K8S config files, diagrams, and API documentation for `Sejuta Cita Tech Test`. API documentation can be accessed [here](https://app.swaggerhub.com/apis-docs/pramindanata/sc-tech-test/1.0.0).

Admin credentials:

- Username: `pramindanata`
- Password: `password`

## Microservices Architecture

This repository contain 2 services, namely:

- `auth-service`: Service for user authentication, such as login, logout, and refresh token.
- `user-service`: Service for user CRUD.

Both of them use `Node.js` (v14.17) and `MongoDB` (v4.4). There is also `NATS Streaming` (v0.22) which is used as a message broker for communication between services.

## User Authorization

The following are the authorization details of user action represented in table:

| Action              | Admin | User |
|---------------------|-------|------|
| Login               | v     | v    |
| Logout              | v     | v    |
| Refresh Token       | v     | v    |
| See user pagination | v     | -    |
| See user detail     | v     | v    |
| Create user         | v     | -    |
| Update user         | v     | -    |
| Delete user         | v     | -    |

## API Documentation

API documentation created using the OpenAPI specification and its scheme can be found inside `./swagger.yml`. Due to the auth implementation uses cookie and CORS issues, open or import `swagger.yml` file from SwaggerHub to test the production server.

## K8S Config Files

K8S configuration files can be found inside `./k8s` folder. It contains 3 folders:

- `base`: contains K8S object configurations for both dev/local and prod environment.
- `dev`: contains K8S object configurations for dev/local env only. PVC objects claim less spaces and has no load balancer.
- `prod`: contains K8S object configurations for prod env only. PVC objects claim more spaces and has Digital Ocean load balancer.

```sh
kubectl create secret generic app-secret --from-literal APP_SECRET=<app_secret_value>
```

## Token Refresh Mechanism

The microservices use JWT as the authentication token. Created token contains 4 claims namely:

- `iat`: when the token issued (`int`).
- `sub`: user ID (`string`).
- `exp`: when the token expired (`int`, 30 minutes).
- `ref_exp`: when the token can't be refreshed anymore (`int`, 2 weeks).

Token refresh mechanism uses `ref_exp` claim inside the token to determine whether the token can be refreshed or not. If the current second is less than the value of `ref_exp`, then the token can be refreshed. Refreshing is done by changing the values of `iat` and `exp` with new values.

## Deployment

Make sure to create `app-secret` object and install `ingress-nginx` in K8S cluster. `ingress-nginx` installation can be found [here](https://kubernetes.github.io/ingress-nginx/deploy).

### K8S

#### Prod Environment

Note: *Current implementation uses Digital Ocean Kubernetes service*

Some objects need opaque `APP_SECRET` value from secret object named `app-secret`. Make sure to create this `app-secret` object in K8S cluster by running `kubectl create secret` command, for example:

Before applying K8S config files to prod cluster, change hostname values inside `./k8s/prod/ingress.yml` to the name that will be used. Change the value of this properties:

- `spec.rules[].host`
- `metadatada.annotations.service.beta.kubernetes.io/do-loadbalancer-hostname`

Then run the command below:

```sh
kubectl apply -f ./k8s/base -f ./k8s/prod
```

#### Dev/Local Environment

Before applying K8S config files to local cluster, change hostname value inside `./k8s/dev/ingress.yml` to the name that will be used. Change the value of property `spec.rules[].host`.

Make sure to add given hostname to OS `hosts` file and point it to `127.0.0.1` (or to another IP address if you use something like Minikube, use `minikube ip` command to find it out). Then run the command below:

```sh
kubectl apply -f ./k8s/base -f ./k8s/dev
```

### Tiltfile

Requirement: [Tilt](https://tilt.dev) (v0.21) installed

This repository also contains `Tiltfile` to easily test and develop apps inside K8S cluster. Run `tilt up` command inside the directory where `Tiltfile` file located to start Tilt.

## Other

### Seeding Data

To seed `auth-service` and `user-service` DB with prepared data, run the command below inside each service directory:

```sh
npm run seed:run
```

To clear data inside DB, run the command below inside each service directory:

```sh
npm run seed:clear
```

### `docker-compose.dev.yml`

This repository also contains `docker-compose.dev.yml` to run MongoDB, NATS Streaming, & NATS Streaming Console which each service needs in the development process.
