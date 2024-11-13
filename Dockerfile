FROM node:20

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY prisma ./prisma

COPY . .

RUN npx prisma generate

RUN npm run build


CMD [ "npm", "run", "start:prod" ]

# FROM node:20

# WORKDIR /app

# COPY  node_modules ./node_modules
# COPY  dist ./dist

# EXPOSE 3000

# ENV PORT=3000

# CMD ["node", "dist/src/main"]