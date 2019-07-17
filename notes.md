to add sinon

```shell
npm install --save-dev sinon sinon-chai sinon-stub-promise node-fetch
```

**passo 01**:

- remover o modulos antigos
- atualizar o sinon e o sinon-chai

```shell
npm uninstall sinon sinon-chai sinon-stub-promise --save-dev
npm install sinon sinon-chai --save-dev
```

no meu caso a versão instalada foram

```json
// package.json
"devDependencies": {
  // outras dependencias
  "sinon": "^7.3.2",
  "sinon-chai": "^3.3.0"
}
```

**passo 02**: remover os códigos referentes ao `sinon-stub-promise` do arquivo `tests/main.spec.js` (em meu caso linhas 4 e 19) como abaixo

```javascript
// remover esse import
import sinonStubPromise from 'sinon-stub-promise'

// remover essa inicializacao
sinonStubPromise(sinon)
```

**passo 03**: ajustes no `beforeEach`

```javascript
// alterar esse trecho
fetchedStub.returnsPromise()

// para esse
fetchedStub.resolves({ json: () => ({ body: 'json' }) })
```

em meu caso o trecho completo ficou assim

```javascript
beforeEach(() => {
  fetchedStub = sinon.stub(global, 'fetch')
  fetchedStub.resolves({ json: () => ({ body: 'json' }) })
})
```

**passo 04**: implementar os testes

- O exemplo de teste abaixo mostra como o `expect` agora deve ser feito com base na execução do `then`

```javascript
it('Should return JSON data from the promise', () => {
  const artists = search('araketu', 'artist')

  artists.then(data => {
    expect(data).to.be.eql({ body: 'json' })
  })
})
```

## Algumas observações

1.  Por vezes quando o resultado era diferente do esperado tive um warning do node, mas o teste continuava passando dando o resultado abaixo

# Aulas

> ao se rodar os scripts de exemplos da pasta example usae `babel-node` ao inves de apenas `node` devido aos modulos. É necessária a instalação desse pacote através do comando

```shell
npm install -g babel-node
```

Ao tentar rodar o comando `babel-node` foi exibido um erro, isso acontece devido as diversas atualizações que essas libs sofreram ao longo do tempo. Testei duas soluções, uma mais conservadora com as versões das aulas, outra atualizando para o **Babel 7**. Ambas são bem simples e mantiveram o funcionamento correto da lib.

## Solucão 01: Babel cli 6

Esta é a solução mais conservadora no ponto de vista de alteração de arquivos e reinstalação de pacotes. O pacote `babel-node` esta incluso no modulo `babel-cli` então é necessário a atualização conforme os passos abaixo.

1. remoção do babel node (caso tenha instalado)

```shell
npm uninstall --save-dev babel-node
```

2. instalação do babel-cli.

```shell
npm install --save-dev babel-cli
```

No meu caso preferi instalar nas dependencias de dev, sendo assim, o comando deve ser rodado usando o caminho do `node_modules` ou `npx`

```shell
# usando node_modules
./node_modules/.bin/babel-node ./examples/albums.js

# usando npx
npx babel-node ./examples/albums.js
```

As dependencias ficaram conforme abaixo

```json

// package.json

"devDependencies": {
  "babel-cli": "^6.26.0",
  "babel-preset-env": "^1.7.0",
  "babel-register": "^6.26.0"

  // ...outras  dependencias
}
```

## Solucão 02: Babel 7

Também é possível atualizar para a versão nova do babel onde varias mudanças ocorreram em termos de separação e nomenclatura dos módulos. Focarei apenas nas alterações necessárias para a atualização e estabilização dos códigos para essa aula.

**passo 01**: remoção dos pacotes

```shell
npm uninstall --save-dev babel-node babel-preset-env babel-register
```

caso tenha instalado o babel-cli, também é necessário remove-lo

```shell
npm uninstall --save-dev babel-cli
```

**passo 02**: Instalação dos novos pacotes

```shell
npm install --save-dev @babel/core @babel/node @babel/preset-env @babel/register
```

em meu caso as versões ficaram como

```json

// package.json

"devDependencies": {
  "@babel/core": "^7.5.4",
  "@babel/node": "^7.5.0",
  "@babel/preset-env": "^7.5.4",
  "@babel/register": "^7.4.4",

  // ...outras  dependencias
}
```

**passo 03**: Alterar `.babelrc`

O arquivo completo ficou da seguinte forma

```json
// .babelrc
{
  "presets": ["@babel/preset-env"]
}
```

**passo 04**: Alterar comando de teste

Como o módulo `babel-register` tambem foi atualizado é preciso alterar os comandos que rodam os testes. Abaixo está o exemplo de como ficou

```json
// package.json

"scripts": {
    // ...outros comandos

    "test": "./node_modules/.bin/mocha tests/**/*.spec.js --require @babel/register",
    "test:tdd": "npm run test -- --watch"
}
```

assim como antes as instalações foram feitas local e não globalmente. Para testar, use o comando abaixo

```shell
# usando node_modules
./node_modules/.bin/babel-node ./examples/albums.js

# usando npx
npx babel-node ./examples/albums.js
```

Para rodar os testes

```shell
npm test
```

LINKS
[babel-register --compilers](https://github.com/mochajs/mocha/wiki/compilers-deprecation)
[babel es6](https://medium.com/@jeffersontpadua/configurando-um-projeto-nodejs-e-es6-com-babel-7-283fc0c2b640)
[babel 7 with node](https://hackernoon.com/using-babel-7-with-node-7e401bc28b04)
[babel node](https://babeljs.io/docs/en/babel-node)
