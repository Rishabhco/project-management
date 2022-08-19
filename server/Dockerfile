# pull official base image
FROM node:latest

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN npm install

# add app
COPY . ./

# add ENV varialbes
ENV NODE_ENV production
ENV PORT 3001
ENV MONGO_URI 'mongodb+srv://rishabh:rishabh@cluster0.kaxxnnq.mongodb.net/mgmt_db?retryWrites=true&w=majority'

# start app
CMD ["npm", "start"]