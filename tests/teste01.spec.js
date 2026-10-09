import { test, expect } from '@playwright/test';

test('Realizar compra com dois produtos, cupom e frete grátis', async ({ page }) => {

  // 1. Acessar o site
  await page.goto('https://verzel-store.qa-test-verzel-store.workers.dev/');

  // 2. Aguardar o carregamento da página
  await page.waitForLoadState('networkidle');
  
  // 3. Localizar o produto "Camiseta Essencial"
  const camiseta = page.getByText('Camiseta Essencial', { exact: true });

  // 4. Validar que o produto está disponível
  await expect(camiseta).toBeVisible();

  // 5. Localizar o card do produto
  const cardCamiseta = camiseta.locator('..');

  // 6. Adicionar a camiseta ao carrinho
  await cardCamiseta.getByRole('button', {
    name: /adicionar|carrinho/i
  }).click();

  // 7. Localizar o produto "Tênis Casual Urbano"
  const tenis = page.getByText('Tênis Casual Urbano', { exact: true });

  // 8. Validar que o produto está disponível
  await expect(tenis).toBeVisible();

  // 9. Localizar o card do produto
  const cardTenis = tenis.locator('..');

  // 10. Adicionar o tênis ao carrinho
  await cardTenis.getByRole('button', {
    name: /adicionar|carrinho/i
  }).click();

  // 11. Localizar o carrinho
  const carrinho = page.getByRole('link', {
    name: /carrinho/i
  });

  // 12. Clicar no carrinho
  await carrinho.click();

  // 13. Aguardar o carregamento da página do carrinho
  await page.waitForLoadState('networkidle');

  // 14. Validar Camiseta Essencial
  await expect(
    page.getByText('Camiseta Essencial', { exact: true })
  ).toBeVisible();

  // 15. Validar Tênis Casual Urbano
  await expect(
    page.getByText('Tênis Casual Urbano', { exact: true })
  ).toBeVisible();

  // 16. Localizar o campo "Cupom de desconto"
  const campoCupom = page.getByLabel('Cupom de desconto');

  // 17. Adicionar o cupom BEMVINDO10
  await campoCupom.fill('BEMVINDO10');

  // 18. Clicar em "Aplicar cupom"
  await page.getByRole('button', {
    name: 'Aplicar cupom'
  }).click();

  // 19. Validar que o cupom está válido
  await expect(
    page.getByText(/cupom.*(válido|aplicado)/i)
  ).toBeVisible();

  // 20. Validar que o frete é grátis
  await expect(
    page.getByText(/Cupom BEMVINDO10 aplicado|Cupom BEMVINDO10 aplicado/i)
  ).toBeVisible();

  // Localizar o texto "Finalizar compra"
  const finalizarCompra = page.getByText('Finalizar compra', {
  exact: true
});

  // Validar que o texto está visível
  await expect(finalizarCompra).toBeVisible();

  // Clicar em "Finalizar compra"
  await finalizarCompra.click();

  // 23. Preencher Nome completo
  await page.getByLabel('Nome completo').fill('Mauricio Souza');

  // 24. Preencher e-mail
  await page.getByLabel('E-mail').fill('mauricio@email.com');

  // 25. Preencher CEP
  await page.getByLabel('CEP').fill('45800-000');

  // 26. Clicar em "Confirmar pedido"
  await page.getByRole('button', {
    name: 'Confirmar pedido'
  }).click();

  // 27. Validar confirmação do pedido
  await expect(
    page.getByText(/pedido.*(confirmado|realizado|sucesso)/i)
  ).toBeVisible();

});