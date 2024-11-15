# Etapa 1: Usar uma imagem base do Node.js
FROM node:18

# Configuração do diretório de trabalho
WORKDIR /app

# Copiar os arquivos principais para o contêiner
COPY package.json yarn.lock lerna.json ./

# Instalar dependências no nível do workspace
RUN yarn install
# Copiar o restante do projeto para o contêiner
COPY . .

# Expor as portas para os dois aplicativos
EXPOSE 3001 3002

# Comando para iniciar os aplicativos simultaneamente
CMD ["yarn", "start"]
