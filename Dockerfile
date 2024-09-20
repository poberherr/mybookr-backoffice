# Use Node.js 22 Alpine image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Install PostgreSQL client, libraries, and build tools including 'make'
RUN apk add --no-cache postgresql-client postgresql-libs postgresql-dev build-base make

# Install Node.js dependencies using npm ci
COPY package.json package-lock.json ./ 
RUN npm ci --force

# Copy only the necessary files and folders
COPY README.md Makefile tsconfig.json ./ 
COPY src ./src

# Build the project during image build
RUN npm run build

# Expose the port that your application will run on
EXPOSE 4200

# Set the command to start your application
CMD [ "npm", "start" ]
