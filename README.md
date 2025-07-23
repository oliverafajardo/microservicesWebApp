# 📝 GitTix - Microservices Blog Platform (Version 1.0)

> **Note: This is Version 1.0 of the GitTix application - a blog/social media platform built with microservices architecture. This version runs entirely locally without cloud infrastructure, unlike Version 2.0 which uses Google Cloud Platform.**

A modern, scalable blog and social media platform built with microservices architecture, featuring real-time content management, user interactions, and event-driven communication between services. **This version demonstrates local development and deployment patterns without cloud dependencies.**

## 🏗️ Architecture Overview

This **Version 1.0** application follows a microservices pattern with the following services:

- **Client Service** - React frontend application
- **Posts Service** - Blog post creation and management
- **Comments Service** - User comments and discussions
- **Query Service** - Data aggregation and search functionality
- **Moderation Service** - Content moderation and filtering
- **Event Bus** - Inter-service communication and event handling

## 🚀 Tech Stack

### Backend Services
- **Node.js** with JavaScript
- **Express.js** for API development
- **Event-driven architecture** for service communication
- **HTTP-based inter-service communication**

### Frontend
- **React.js** for user interface
- **Real-time updates** through event bus
- **Responsive design**

### Infrastructure
- **Kubernetes** for container orchestration (local cluster)
- **Docker** for containerization (local Docker daemon)
- **Skaffold** for development workflow
- **100% Local Development** - No cloud infrastructure required
- **Local Image Building** - Images built and stored locally
- **No Remote Registries** - Complete local deployment pipeline

## 📁 Project Structure

```
microservicesWebApp-v1/
├── client/              # React frontend application
│   ├── src/            # React components and logic
│   └── Dockerfile      # Frontend containerization
├── posts/              # Blog posts service
│   ├── index.js        # Posts API endpoints
│   └── Dockerfile      # Posts service container
├── comments/           # Comments service
│   ├── index.js        # Comments API endpoints
│   └── Dockerfile      # Comments service container
├── query/              # Data aggregation service
│   ├── index.js        # Query and search endpoints
│   └── Dockerfile      # Query service container
├── moderation/         # Content moderation service
│   ├── index.js        # Moderation logic
│   └── Dockerfile      # Moderation service container
├── event-bus/          # Event communication service
│   ├── index.js        # Event bus implementation
│   └── Dockerfile      # Event bus container
├── infra/
│   └── k8s/           # Kubernetes deployment manifests
└── skaffold.yaml      # Skaffold configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 14+
- Docker
- kubectl
- Skaffold

### Local Development

1. **Clone the repository**
   ```bash
   git clone https://github.com/oliverafajardo/microservicesWebApp.git
   cd microservicesWebApp
   git checkout first-implementation
   ```

2. **Install dependencies for each service**
   ```bash
   # Install client dependencies
   cd client && npm install && cd ..
   
   # Install posts service dependencies
   cd posts && npm install && cd ..
   
   # Install comments service dependencies
   cd comments && npm install && cd ..
   
   # Install query service dependencies
   cd query && npm install && cd ..
   
   # Install moderation service dependencies
   cd moderation && npm install && cd ..
   
   # Install event-bus service dependencies
   cd event-bus && npm install && cd ..
   ```

3. **Start development environment**
   ```bash
   # From the root directory
   skaffold dev
   ```

## 🔧 Configuration

### Local Development Setup
- **100% Local Environment** - No cloud services or external dependencies
- **Local Docker Build** - Uses local Docker daemon for image building
- **No Remote Registry** - Images built and stored locally only
- **Local Kubernetes Cluster** - Runs on your local machine (Docker Desktop, Minikube, etc.)
- **Hot Reloading** - Automatic code synchronization for all services
- **Offline Development** - Can develop without internet connection

### Service Communication
- **Event Bus** - Centralized event handling between services
- **HTTP APIs** - RESTful communication between services
- **Real-time Updates** - Event-driven updates to frontend
- **Local Network** - All communication happens within local Kubernetes cluster

## 🚀 Features

### Content Management
- **Blog Post Creation** - Create and manage blog posts
- **Comment System** - User comments and discussions
- **Content Moderation** - Automated content filtering
- **Search and Query** - Advanced content search capabilities

### User Experience
- **Real-time Updates** - Live content updates through events
- **Responsive Design** - Mobile-friendly interface
- **Interactive Comments** - Real-time comment system

### Architecture
- **Event-Driven Design** - Loose coupling between services
- **Scalable Microservices** - Independent service scaling
- **Local Container Orchestration** - Kubernetes deployment on local cluster
- **Development Workflow** - Skaffold for seamless local development
- **No Cloud Dependencies** - Completely self-contained local environment

## 📊 API Endpoints

### Posts Service
- `POST /posts` - Create new blog post
- `GET /posts` - List all posts
- `GET /posts/:id` - Get specific post
- `PUT /posts/:id` - Update post
- `DELETE /posts/:id` - Delete post

### Comments Service
- `POST /posts/:id/comments` - Add comment to post
- `GET /posts/:id/comments` - Get comments for post
- `PUT /comments/:id` - Update comment
- `DELETE /comments/:id` - Delete comment

### Query Service
- `GET /posts` - Get posts with comments
- `GET /posts/:id` - Get post with comments
- Search and aggregation endpoints

### Moderation Service
- Content filtering and moderation
- Automated content review
- Moderation event handling

## 🔍 Development Workflow

### Hot Reloading
Skaffold provides automatic hot reloading for:
- JavaScript files in all services
- React components in client
- Configuration changes

### Service Development
1. Make changes to any service
2. Skaffold automatically detects changes
3. Images are rebuilt locally
4. Services restart with new code

### Event-Driven Development
- **Event Bus** - Central communication hub
- **Service Events** - Events trigger service actions
- **Real-time Updates** - Frontend updates via events

## 🧪 Testing

### Running Tests
```bash
# Test individual services
cd posts && npm test
cd comments && npm test
cd query && npm test
```

## 📈 Monitoring and Logging

- **Kubernetes Dashboard** - Monitor pod status
- **Skaffold Logs** - Real-time development logs
- **Service Logs** - Individual service logging
- **Event Monitoring** - Track event bus activity

## 🔄 Evolution to Version 2.0

This Version 1.0 blog platform evolved into **GitTix Version 2.0**, a ticketing application with significant architectural changes:

### **Major Changes in Version 2.0:**
- **Cloud Migration** - Moved from local-only to Google Cloud Platform
- **Authentication System** - JWT-based user authentication
- **Database Integration** - MongoDB with Mongoose
- **TypeScript Migration** - Type-safe development
- **Enhanced Security** - Password hashing, input validation
- **Resource Management** - Kubernetes resource limits
- **Production Deployment** - Google Cloud Platform integration
- **Remote Image Registry** - Google Container Registry for image storage

### **Infrastructure Evolution:**
- **Local Development → Cloud Production** - From local-only to cloud-native
- **Local Docker → Google Cloud Build** - Remote image building
- **Local Images → Remote Registry** - Images pushed to Google Container Registry
- **Local Cluster → GKE** - Kubernetes on Google Kubernetes Engine
- **Offline Development → Cloud Services** - Integration with cloud services

### **Service Evolution:**
- **Posts → Tickets** - Content management to ticket management
- **Comments → Reviews** - Comment system to ticket reviews
- **Query → Search** - Enhanced search capabilities
- **Moderation → Validation** - Content moderation to ticket validation
- **Event Bus → Direct APIs** - Event-driven to RESTful communication

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Built following Stephen Grider's microservices course
- Demonstrates event-driven microservices architecture
- Foundation for the evolved GitTix ticketing platform
- **Local Development Focus** - Shows how to build microservices without cloud dependencies

## 📞 Support

For support and questions:
- Create an issue in this repository
- Check the [Kubernetes documentation](https://kubernetes.io/docs/)
- Review [Skaffold documentation](https://skaffold.dev/docs/)

---

**Version 1.0 - Blog Platform | Built with ❤️ using event-driven microservices architecture**

> **Note: For the latest version of GitTix (ticketing platform with cloud infrastructure), please check the `main` or `second-implementation` branches.**