## Prerequisites

  ```bash
  npm install -g nx
  ```

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd <repository-directory>
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

## Configuration

### Setting Up Environment Variables

Create a `.env` file in the root of the project with the following content:

```env
MONGODB_URI=<link>
JWT_SECRET=<your-jwt-secret>
```
for the jwt secret you can do it using the terminal:

  ```bash
  openssl rand -base64 32
  ```

### Start MongoDB

Ensure that MongoDB is running.


### Running the API Server

Start the API server using Nx:

```bash
nx serve api
```

The API will be running at `http://localhost:3000/api`.

### Running the Frontend Application

Start the frontend application:

```bash
nx serve frontend
```

The application will be accessible at `http://localhost:4200`.
