FROM node:18

ENV PNPM_HOME="/pnpm"
ENV PATH="${PNPM_HOME}:$PATH"

RUN corepack enable

WORKDIR /app

COPY package.json pnpm-lock.yaml ./
COPY prisma ./prisma/

RUN pnpm install

COPY . .
