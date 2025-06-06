# Dockerfile

# Use official Node image
FROM arm32v7/node:18

# Set working directory
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the app
COPY . .

# Build the Next.js app
RUN npm run build

ENV NODE_ENV=production

# Expose the default Next.js port
EXPOSE 3000

# Start the app
CMD ["npm", "start"]
