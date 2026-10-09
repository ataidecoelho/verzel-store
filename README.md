# Automação de Testes E2E — Verzel Store

## 1. Sobre o projeto

Este projeto tem como objetivo automatizar um cenário de teste end-to-end (E2E) da loja virtual **Verzel Store**, utilizando Playwright com JavaScript.
O teste01.spec.js valida todo o processo de compra adicionando produtos no carrinho, adicionando cupom de desconto válido e finalização da compra.
O teste02.spec.js valida o processo de compra adicionando a quantidade máxima permitida de um produto e finalizando a compra sem cupom de desconto.
O teste03.spec.js valida o processo de limpeza de carrinho removendo todos os produtos adicionados e voltanto para a tela inicial.

## 2. Tecnologias utilizadas

* **JavaScript:** linguagem utilizada para desenvolver os testes.
* **Playwright:** framework de automação de testes.
* **Node.js:** ambiente de execução JavaScript.
* **@playwright/test:** biblioteca utilizada para estruturar e executar os testes automatizados.

## 3. Ambiente de teste

**URL da aplicação:**

https://verzel-store.qa-test-verzel-store.workers.dev/

**Tipo de teste:** End-to-End (E2E)

**Funcionalidades testadas:** Carrinho de compras realizando pedido com sucesso, adicionando cupom válido, limpeza de carrinho.

## 4. Evidencias da Entrega

Na asta documentos, há os seguintes arquivos em pdf e xlsx:
Bug Report
Cenários de Teste
Link dos videos executanto testes
Execução dos testes com Resultados

```text
verzel-store/
├── tests/
│   └── teste01.spec.js
│   └── teste02.spec.js
│   └── teste03.spec.js
├── package.json
├── package-lock.json
├── playwright.config.js
└── README.md
```

* `tests/teste01.spec.js`: contém o cenário automatizado.
* `tests/teste02.spec.js`: contém o cenário automatizado.
* `tests/teste03.spec.js`: contém o cenário automatizado.
* `package.json`: define as dependências e os scripts do projeto.
* `package-lock.json`: registra as versões resolvidas das dependências.
* `playwright.config.js`: configura a execução dos testes.
* `README.md`: documenta o projeto e orienta sua execução.

## 5. Instalação e configuração

### Pré-requisitos

Instale o Node.js e o npm antes de executar os comandos.

### Instalar o Playwright

Na pasta do projeto, execute:

```bash
npm init playwright@latest
```

Caso o projeto já esteja configurado, instale as dependências existentes com:

```bash
npm install
```

Instale os navegadores necessários:

```bash
npx playwright install
```

## 6. Executar os testes

Para executar todos os testes configurados:

```bash
npx playwright test
```

## 7. Relatório de execução

Após a execução, gere ou consulte o relatório HTML do Playwright:

```bash
npx playwright show-report
```

O relatório permite consultar o status dos testes, falhas, erros e evidências disponíveis da execução.