import { test, expect } from '@playwright/test';

test('Adicionar três produtos, limpar carrinho e clicar em Ver produtos', async ({ page }) => {

  // 1. Acessar a página inicial
  await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/');

  // 2. Aguardar o carregamento da página
  await page.waitForLoadState('networkidle');

  // 3. Lista de produtos que serão adicionados
  const produtos = [
    'Camiseta Essencial',
    'Calça Jeans Slim',
    'Tênis Casual Urbano'
  ];

  // 4. Adicionar uma unidade de cada produto ao carrinho
  for (const nomeProduto of produtos) {

    // Localizar o produto
    const produto = page.getByText(nomeProduto, { exact: true });

    // Validar que o produto está visível
    await expect(produto).toBeVisible();

    // Localizar o card do produto
    const cardProduto = produto.locator('..');

    // Adicionar o produto ao carrinho
    await cardProduto.getByRole('button', {
      name: /adicionar|carrinho/i
    }).click();
  }

  // 5. Acessar o carrinho
  await page.getByRole('link', {
    name: /carrinho/i
  }).click();

  // 6. Aguardar o carregamento do carrinho
  await page.waitForLoadState('networkidle');

  // 7. Validar que os três produtos estão no carrinho
  for (const nomeProduto of produtos) {
    await expect(
      page.getByText(nomeProduto, { exact: true })
    ).toBeVisible();
  }

  // 8. Validar que nenhum cupom foi aplicado
  await expect(
    page.getByText(/cupom.*(aplicado|válido)/i)
  ).toHaveCount(0);

  // 9. Limpar o carrinho
  const botaoLimparCarrinho = page.getByRole('button', {
    name: /limpar carrinho|esvaziar carrinho|remover todos/i
  });

  await expect(botaoLimparCarrinho).toBeVisible();
  await botaoLimparCarrinho.click();

  // 10. Validar que o carrinho está vazio
  await expect(
    page.getByText(/carrinho vazio|seu carrinho está vazio/i)
  ).toBeVisible();

  // 11. Clicar em "Ver produtos"
  const botaoVerProdutos = page.getByRole('link', {
    name: /ver produtos/i
  });

  await expect(botaoVerProdutos).toBeVisible();
  await botaoVerProdutos.click();

  // 12. Validar que retornou à página de produtos
  await expect(
    page.getByText('Camiseta Essencial', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Calça Jeans Slim', { exact: true })
  ).toBeVisible();

  await expect(
    page.getByText('Tênis Casual Urbano', { exact: true })
  ).toBeVisible();

});