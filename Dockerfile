FROM vuejs/ci as admin
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN npm run build
# FROM nginx
# COPY --from=admin /app/dist /usr/share/nginx/html
