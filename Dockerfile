# Use Node.js 22 Alpine image as the base
FROM node:22-alpine

# Set the working directory inside the container
WORKDIR /app

# Install PostgreSQL client, libraries, and build tools including 'make'
RUN apk add --no-cache postgresql-client postgresql-libs postgresql-dev build-base make

# Install Yarn
# RUN npm install -g yarn

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./

# Install dependencies using Yarn
RUN yarn install --frozen-lockfile

# Copy only the necessary files and folders
COPY README.md Makefile tsconfig.json ./
COPY src ./src

# Build the project during image build
RUN yarn build

# Expose the port that your application will run on
EXPOSE 4200

# Set the command to start your application
CMD [ "yarn", "start" ]
