# Use uma imagem Node.js como base
FROM node:18

# Configuração do diretório de trabalho
WORKDIR /app

# Copie o arquivo de configuração principal
COPY package.json yarn.lock lerna.json ./

# Instale as dependências do workspace
RUN yarn install

# Copie todo o conteúdo dos aplicativos
COPY . .

# Compile os aplicativos (se necessário)
RUN yarn build

# Exponha as portas dos aplicativos
EXPOSE 3001 3002

# Comando para iniciar ambos os aplicativos
CMD ["yarn", "start"]
