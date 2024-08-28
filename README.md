# Momento Topics Microservices Prototyping

This application is a prototyping microservices using Momento Topics.

## Testing

#### Setup the Momento API Key

1. Go to the [Momento console](https://console.gomomento.com/tokens) and follow the instructions to log in with your email address, Google account, or GitHub account.
2. In the console, select the [API Keys](https://console.gomomento.com/tokens) menu option.
3. Once on the API key page, select the information that matches where your caches live.
4. Once complete, click on the Generate button to create your API Key.

### frontend-app

#### Install npm packages

```shell
cd ./frontend-app
npm i
echo "VITE_MOMENTO_API_KEY=\nVITE_MOMENTO_CACHE_NAME=\nVITE_MOMENTO_TOPIC_NAME=" > .env.local
```

#### Run

```shell
cd ./frontend-app
npm run dev
```

### decentralized-app

#### Install npm packages

```shell
cd ./decentralized-app
npm i
echo "MOMENTO_API_KEY=\nMOMENTO_CACHE_NAME=\nMOMENTO_TOPIC_NAME=" > .env
```

#### Run

```shell
cd ./decentralized-app
npx dotenvx run -- npx tsx index.ts
```

## License

This project is licensed under the [MIT license](LICENSE).
