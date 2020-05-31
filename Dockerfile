FROM nginx
COPY /dist /usr/share/nginx/html
# FROM vuejs/ci as admin
# WORKDIR /app
# COPY package.json yarn.lock ./
# RUN yarn install
# COPY . .
# RUN yarn build