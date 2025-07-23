# 🎫 GitTix - Microservices Ticketing Application

A modern, scalable ticketing platform built with microservices architecture, featuring robust backend services, real-time authentication, ticket management, and a responsive Next.js frontend. This project demonstrates advanced backend concepts including distributed systems, container orchestration, and cloud-native development.

## 🏗️ Architecture Overview

This application follows a microservices pattern with the following services:

- **Auth Service** - User authentication and authorization
- **Client Service** - Next.js frontend application
- **Tickets Service** - Ticket management and business logic
- **Common Package** - Shared utilities, errors, and middleware

## 🚀 Tech Stack

### Backend Services & APIs
- **Node.js** with TypeScript for type-safe development
- **Express.js** for RESTful API development and middleware management
- **MongoDB** with Mongoose for data persistence and schema validation
- **JWT (JSON Web Tokens)** for stateless authentication
- **Cookie Session** for secure session management
- **express-validator** for request validation and sanitization
- **bcrypt** for password hashing and security

### Frontend
- **Next.js 15** with React for server-side rendering
- **Axios** for HTTP client and API communication
- **Bootstrap** for responsive UI components

### Infrastructure & DevOps
- **Kubernetes** for container orchestration and service discovery
- **Docker** for containerization and consistent environments
- **Skaffold** for development workflow and hot reloading
- **Google Cloud Platform** for cloud infrastructure
- **Google Container Registry** for container image storage
- **Google Kubernetes Engine (GKE)** for managed Kubernetes clusters

## 📁 Project Structure

```
microservicesWebApp/
├── auth/                 # Authentication service
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── models/       # Database models
│   │   ├── middlewares/  # Express middlewares
│   │   └── errors/       # Custom error classes
│   └── Dockerfile
├── client/               # Next.js frontend
│   ├── pages/           # Next.js pages
│   ├── components/      # React components
│   ├── api/            # API client utilities
│   └── Dockerfile
├── tickets/             # Tickets service
│   ├── src/
│   │   ├── routes/      # Ticket API endpoints
│   │   ├── models/      # Ticket models
│   │   └── app.ts       # Express app setup
│   └── Dockerfile
├── common/              # Shared package
│   ├── src/
│   │   ├── errors/      # Common error classes
│   │   └── middlewares/ # Shared Express middlewares
│   └── package.json
├── infra/
│   └── k8s/            # Kubernetes manifests
└── skaffold.yaml       # Skaffold configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+ (recommended: use Volta for version management)
- Docker
- kubectl
- Skaffold
- Google Cloud SDK

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/oliverafajardo/microservicesWebApp.git
   cd microservicesWebApp
   ```

2. **Install dependencies**
   ```bash
   # Install common package dependencies
   cd common && npm install && npm run build && npm publish
   
   # Install auth service dependencies
   cd ../auth && npm install
   
   # Install client dependencies
   cd ../client && npm install
   
   # Install tickets service dependencies
   cd ../tickets && npm install
   ```

3. **Set up Google Cloud**
   ```bash
   # Authenticate with Google Cloud
   gcloud auth login
   gcloud config set project ticketing-dev-463223
   
   # Configure kubectl for your cluster
   gcloud container clusters get-credentials <cluster-name> --zone <zone>
   ```

4. **Create Kubernetes secrets**
   ```bash
   kubectl create secret generic jwt-secret --from-literal=JWT_KEY=your_jwt_secret_here
   ```

5. **Start development environment**
   ```bash
   # From the root directory
   skaffold dev
   ```

### Production Deployment

1. **Build and push images**
   ```bash
   skaffold build
   ```

2. **Deploy to production**
   ```bash
   skaffold run
   ```

## 🔧 Configuration

### Environment Variables

#### Auth Service
- `JWT_KEY` - Secret key for JWT token signing
- `MONGO_URI` - MongoDB connection string

#### Tickets Service
- `JWT_KEY` - Secret key for JWT token signing
- `MONGO_URI` - MongoDB connection string

#### Client Service
- `JWT_KEY` - Secret key for JWT token signing

### Kubernetes Resources

All services include resource limits to prevent resource starvation:
- **Memory**: 512Mi limit, 256Mi request
- **CPU**: 500m limit, 250m request

## 🚀 Features

### Backend Services
- **Microservices Architecture** - Decoupled services for scalability and maintainability
- **RESTful APIs** - Clean, stateless API design with proper HTTP methods
- **Database Design** - MongoDB with Mongoose schemas and data validation
- **Authentication System** - JWT-based stateless authentication with secure password hashing
- **Request Validation** - Input sanitization and validation using express-validator
- **Error Handling** - Custom error classes with proper HTTP status codes
- **Middleware Architecture** - Reusable middleware for authentication, validation, and error handling
- **Service Communication** - Inter-service communication through HTTP APIs

### Authentication & Security
- User registration with password hashing (bcrypt)
- JWT-based stateless authentication
- Secure session management with cookies
- Protected routes with middleware
- Input validation and sanitization
- Custom error handling with proper status codes

### Frontend
- Responsive design with Bootstrap
- Server-side rendering with Next.js
- Dynamic navigation based on auth status
- Form validation and error handling
- API integration with Axios

### Infrastructure & DevOps
- **Containerized Microservices** - Docker containers for consistent deployment
- **Kubernetes Orchestration** - Service discovery, load balancing, and scaling
- **Resource Management** - CPU and memory limits for optimal performance
- **Health Checks** - Automated health monitoring and restart capabilities
- **Cloud-Native Development** - Google Cloud Platform integration
- **CI/CD Ready** - Skaffold for automated development workflows

## 📊 API Endpoints

### Auth Service (`/api/users`)
- `POST /signup` - User registration
- `POST /signin` - User login
- `POST /signout` - User logout
- `GET /currentuser` - Get current user info

### Tickets Service (`/api/tickets`)
- `POST /` - Create new ticket
- `GET /` - List all tickets
- `GET /:id` - Get ticket by ID
- `PUT /:id` - Update ticket
- `DELETE /:id` - Delete ticket

## 🔍 Development Workflow

### Backend Development
- **TypeScript Development** - Type-safe backend development with proper interfaces
- **API Design** - RESTful API endpoints with proper HTTP status codes
- **Database Operations** - Mongoose models with schema validation and middleware
- **Middleware Development** - Custom middleware for authentication, validation, and error handling
- **Error Handling** - Custom error classes extending base error types

### Hot Reloading
Skaffold provides automatic hot reloading for:
- TypeScript/JavaScript files
- CSS/SCSS files
- HTML templates
- Configuration files

### Code Changes
1. Make changes to your code
2. Skaffold automatically detects changes
3. Images are rebuilt and deployed
4. Services restart with new code

### Debugging
- Check Skaffold logs for service status
- Use `kubectl logs` for detailed service logs
- Monitor resource usage with `kubectl top pods`
- Debug API endpoints with proper error logging

## 🧪 Testing

### Running Tests
```bash
# Auth service tests
cd auth && npm test

# Client tests (if configured)
cd client && npm test
```

## 📈 Monitoring and Logging

- **Kubernetes Dashboard** - Monitor pod status and resource usage
- **Skaffold Logs** - Real-time development logs
- **Google Cloud Logging** - Production logs and monitoring
- **API Monitoring** - Track API performance and error rates
- **Database Monitoring** - Monitor MongoDB connection and query performance
- **Service Health Checks** - Automated health monitoring for all microservices

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🎯 Backend Learning Outcomes

This project demonstrates key backend development concepts:

### **Microservices Architecture**
- Service decomposition and domain-driven design
- Inter-service communication patterns
- Shared libraries and common utilities
- Independent deployment and scaling

### **API Development**
- RESTful API design principles
- HTTP status codes and error handling
- Request/response validation
- Authentication and authorization patterns

### **Database Design**
- MongoDB schema design with Mongoose
- Data validation and middleware
- Connection management and error handling
- Database operations and queries

### **Security & Authentication**
- JWT token-based authentication
- Password hashing and security best practices
- Session management and cookies
- Input validation and sanitization

### **DevOps & Infrastructure**
- Containerization with Docker
- Kubernetes orchestration and deployment
- Cloud-native development practices
- Resource management and monitoring

## 🙏 Acknowledgments

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the [Kubernetes documentation](https://kubernetes.io/docs/)
- Review [Skaffold documentation](https://skaffold.dev/docs/)

---

**Built with ❤️ using modern microservices architecture** 