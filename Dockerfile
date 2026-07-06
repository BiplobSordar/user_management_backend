# ==========================================
# Stage 1 - Install Dependencies
# ==========================================
FROM node:22-alpine

# Set working directory
WORKDIR /app

# Copy dependency files first (Docker layer caching)
COPY package*.json ./

# Install production dependencies
RUN npm ci --omit=dev

# Copy application source
COPY . .

# Expose backend port
EXPOSE 5000

# Start application
CMD ["npm", "start"]
