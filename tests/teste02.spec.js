import { test, expect } from '@playwright/test';

test('Realizar compra de 5 Calças Jeans Slim sem cupom de desconto', async ({ page }) => {

  // 1. Acessar o site
  await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/');

  // 2. Aguardar o carregamento da página
  await page.waitForLoadState('networkidle');

  // 3. Localizar o produto "Calça Jeans Slim"
  const calca = page.getByText('Calça Jeans Slim', { exact: true });

  // 4. Validar que o produto está disponível
  await expect(calca).toBeVisible();

  // 5. Localizar o card do produto
  const cardCalca = calca.locator('..');

  // 6. Adicionar 5 unidades do produto ao carrinho
  for (let i = 0; i < 5; i++) {
    await cardCalca.getByRole('button', {
      name: /adicionar|carrinho/i
    }).click();
  }

  // 7. Localizar o carrinho
  const carrinho = page.getByRole('link', {
    name: /carrinho/i
  });

  // 8. Acessar o carrinho
  await carrinho.click();

  // 9. Aguardar o carregamento da página do carrinho
  await page.waitForLoadState('networkidle');

  // 10. Validar que o produto está no carrinho
  await expect(
    page.getByText('Calça Jeans Slim', { exact: true })
  ).toBeVisible();

  // 12. Validar que o carrinho não contém mensagem de cupom aplicado
  await expect(
    page.getByText(/cupom.*(aplicado|válido)/i)
  ).toHaveCount(0);

  // 13. Validar que a opção "Finalizar compra" está visível
  const finalizarCompra = page.getByText('Finalizar compra', {
    exact: true
  });

  await expect(finalizarCompra).toBeVisible();

  // 14. Clicar em "Finalizar compra"
  await finalizarCompra.click();

  // 15. Preencher nome completo
  await page.getByLabel('Nome completo').fill('Silva Santos');

  // 16. Preencher e-mail
  await page.getByLabel('E-mail').fill('silva@email.com');

  // 17. Preencher CEP
  await page.getByLabel('CEP').fill('47900-000');

  // 18. Confirmar pedido
  await page.getByRole('button', {
    name: 'Confirmar pedido'
  }).click();

  // 19. Validar confirmação do pedido
  await expect(
    page.getByText(/pedido.*(confirmado|realizado|sucesso)/i)
  ).toBeVisible();

});

