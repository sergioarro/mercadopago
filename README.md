# mercadolibre api backend NestJs

## Requirements

Before you begin, make sure you have the following installed on your system:

- [Node.js 22](https://nodejs.org/) - For running the application in development mode.
- [Docker Engine](https://docs.docker.com/engine/) - For containerization.

# Backend API

## Endpoints

- `/api/items?q=:query` - Buscar items por query
- `/api/items/:id` - Obtener detalle de un item

## Swagger

- Swagger disponible en: `http://localhost:3000/api`

## Comandos

### Installing dependencies

First, ensure Docker is installed on your system. Then, open your terminal and run the following command to install the necessary dependencies:

```bash
$ make install
```

## Running the Application

To run the application in development mode (with watch and debug capabilities), use the following command:

```bash
$ make dev
```

```bash
$ make lint
```

```bash
$ make swagger
```

## Run tests

```bash
# unit tests
$ make test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Swagger Documentation

This project uses Swagger for API documentation. The Swagger documentation provides a detailed view of the API endpoints, request/response schemas, and other useful information.

### Accessing Swagger UI

After starting the application, you can access the Swagger UI at:

```sh
Open http://localhost:3000/api with your browser to see the result.
```

### Swagger JSON

The Swagger JSON is generated automatically and can be found at:

```sh
http://localhost:3000/api-json

## Resources

Check out a few resources that may come in handy when working with NestJS:

- Visit the [NestJS Documentation](https://docs.nestjs.com) to learn more about the framework.
- For questions and support, please visit our [Discord channel](https://discord.gg/G7Qnnhy).
- To dive deeper and get more hands-on experience, check out our official video [courses](https://courses.nestjs.com/).
- Visualize your application graph and interact with the NestJS application in real-time using [NestJS Devtools](https://devtools.nestjs.com).
- Need help with your project (part-time to full-time)? Check out our official [enterprise support](https://enterprise.nestjs.com).
- To stay in the loop and get updates, follow us on [X](https://x.com/nestframework) and [LinkedIn](https://linkedin.com/company/nestjs).
- Looking for a job, or have a job to offer? Check out our official [Jobs board](https://jobs.nestjs.com).

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Stay in touch

- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
```
