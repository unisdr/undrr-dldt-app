FROM directus/directus:9.25.1

# Copy your project files into the Docker container
COPY . .

# Expose port 8055 to the outside
EXPOSE 8055

# Define the command to run the app
CMD [ "npx", "directus", "start" ]
