# Base image 
FROM golang:alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the entire project into the container
COPY . .

# Install dependencies and build the application
RUN go mod tidy
RUN go build -o myapp main.go  # Build the Go application

# Use a lightweight image to run the binary
FROM alpine:latest

# Set the working directory
WORKDIR /app

# Copy the binary from the builder stage
COPY --from=builder /app/myapp .

# Expose port 3000 for the application
EXPOSE 3000

# Run the application
CMD ["./myapp"]
