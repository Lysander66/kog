## Backend

```sh
mkdir franky && cd franky
git init
go mod init github.com/Lysander66/franky
mkdir app qlib
```

dependencies

```sh
go get -u -v github.com/gogf/gf/v2
go get -u gopkg.in/natefinch/lumberjack.v2
go get -u github.com/rs/zerolog/log
go get github.com/spf13/viper
go get
go get
go get
go get
go get -u github.com/gin-gonic/gin
go get github.com/gin-contrib/cors
go get github.com/gin-contrib/pprof
go get github.com/gorilla/websocket

go get gorm.io/gorm
go get gorm.io/driver/postgres
go get github.com/redis/go-redis/v9
```

```sh
echo "# franky" >> README.md
git remote add origin git@github.com:Lysander66/franky.git
git branch -M main
git push -u origin main
```

## Frontend

```sh
yarn create react-app sunny
cd sunny
yarn add react-router-dom antd source-map-explorer
yarn add react-player vanilla-jsoneditor
yarn add css-doodle
yarn add -D sass
yarn add -D @craco/craco
```

- craco

@ 别名路径 webpack 中配置
jsconfig.json 配置文件
react-scripts start 改成 craco start

jsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

craco.config.js

```js
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
}
```

- source-map-explorer

```
"scripts": {
  "report": "source-map-explorer 'build/static/js/*.js'"
}
```

## References

1. [Go Modules](https://github.com/golang/go/wiki/Modules)
1. [Ant Design](https://ant.design/docs/react/use-with-create-react-app-cn)
1. [go:embed](https://github.com/gin-contrib/static/issues/19)
