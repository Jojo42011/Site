# Fly.io deployment: Node server (API + Twilio Media Streams bridge)
#
# We run the API server via tsx to keep the build simple.
# This does NOT change your local demo flow.

FROM node:22-slim

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci --omit=dev=false

COPY . .

# Build the frontend (Vite) into dist for production serving
RUN npm run build

# Fly sets PORT; server/index.ts will honor it.
ENV NODE_ENV=production

EXPOSE 8080

CMD ["node", "--import", "tsx", "server/index.ts"]















