FROM node:16-alpine

# Install bash and netcat (nc)
RUN apk add --no-cache bash netcat-openbsd

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install --only=production

COPY start_up.sh ./
COPY . .

RUN chmod +x ./start_up.sh

# Expose the port the app runs on
EXPOSE 5000

# Use the startup script to launch the app
CMD ["./start_up.sh"]
