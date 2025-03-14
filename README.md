# My V0 Project

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

You need to have the following software installed on your machine:

- Node.js (>= 18)
- npm (comes with Node.js)
- Docker (optional, for containerization)

### Installing

1. Clone the repository:
   ```sh
   git clone https://github.com/olisaemeka111/my-v0-project.git
   cd my-v0-project
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

### Running the Application

#### Development

To run the application in development mode:

```sh
npm run dev
```

The application will be accessible at `http://localhost:4001`.

#### Production

To build and run the application in production mode:

```sh
npm run build
npm start
```

The application will be accessible at `http://localhost:4001`.

## Running with Docker

To build and run the Docker container, use the following commands:

1. Build the Docker image:
   ```sh
   docker build -t my-v0-project .
   ```

2. Run the Docker container:
   ```sh
   docker run -p 4001:4001 my-v0-project
   ```

This will start your Next.js application inside a Docker container and make it accessible on port 4001.

## Built With

- [Next.js](https://nextjs.org/) - The React Framework
- [React](https://reactjs.org/) - A JavaScript library for building user interfaces
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework
- [Docker](https://www.docker.com/) - Containerization platform

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/olisaemeka111/my-v0-project/tags).

## Authors

- **Olisa Emeka** - *Initial work* - [olisaemeka111](https://github.com/olisaemeka111)

See also the list of [contributors](https://github.com/olisaemeka111/my-v0-project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details.

## Pushing to GitHub

To add a remote repository, create a new branch, and push your code to GitHub, use the following commands:

> Note: If the remote origin already exists, you can skip the first command.

```sh
git remote add origin https://github.com/Olisaemeka111/student-login-app.git
git branch -M main
git push -u origin main
```

