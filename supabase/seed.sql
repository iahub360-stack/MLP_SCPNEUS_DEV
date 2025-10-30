-- Inserir categorias
INSERT INTO categories (name, slug, description, image_url) VALUES
('Pneus', 'pneus', 'Pneus para todos os tipos de veículos', '/images/categories/pneus.jpg'),
('Aros e Rodas', 'aros-e-rodas', 'Aros e rodas de alumínio e aço', '/images/categories/aros.jpg'),
('Baterias', 'baterias', 'Baterias automotivas de alta qualidade', '/images/categories/baterias.jpg'),
('Freios', 'freios', 'Sistemas de freio completos', '/images/categories/freios.jpg'),
('Óleos e Lubrificantes', 'oleos-e-lubrificantes', 'Óleos de motor e lubrificantes', '/images/categories/oleos.jpg'),
('Suspensão', 'suspensao', 'Componentes de suspensão', '/images/categories/suspensao.jpg')
ON CONFLICT (slug) DO NOTHING;

-- Inserir marcas
INSERT INTO brands (name, slug, logo_url, description) VALUES
('Pirelli', 'pirelli', '/images/brands/pirelli.png', 'Pneus premium de alta performance'),
('Michelin', 'michelin', '/images/brands/michelin.png', 'Inovação e segurança em pneus'),
('Bridgestone', 'bridgestone', '/images/brands/bridgestone.png', 'Tecnologia japonesa em pneus'),
('Goodyear', 'goodyear', '/images/brands/goodyear.png', 'Pneus para todas as condições'),
('Firestone', 'firestone', '/images/brands/firestone.png', 'Durabilidade e confiança'),
('Continental', 'continental', '/images/brands/continental.png', 'Precisão alemã em pneus')
ON CONFLICT (slug) DO NOTHING;

-- Inserir produtos de exemplo
INSERT INTO products (name, slug, description, short_description, sku, price, compare_price, quantity, status, featured, category_id, brand_id) VALUES
('Pirelli P Zero 205/55R16', 'pirelli-p-zero-205-55r16', 'Pneu de alto desempenho para veículos esportivos. Oferece excelente aderência em pista seca e molhada, com baixa resistência à rolagem.', 'Pneu esportivo de alta performance', 'PIR001', 459.90, 599.90, 50, 'active', true, 
 (SELECT id FROM categories WHERE slug = 'pneus'), 
 (SELECT id FROM brands WHERE slug = 'pirelli')),

('Michelin Pilot Sport 4S 225/45R17', 'michelin-pilot-sport-4s-225-45r17', 'Pneu esportivo máximo para uso em pista e rua. Tecnologia dupla composta para aderência excepcional.', 'Pneu esportivo de competição', 'MIC002', 689.90, 849.90, 30, 'active', true,
 (SELECT id FROM categories WHERE slug = 'pneus'),
 (SELECT id FROM brands WHERE slug = 'michelin')),

('Bridgestone Turanza 195/65R15', 'bridgestone-turanza-195-65r15', 'Pneu confortável para uso diário. Excelente durabilidade e baixo ruído.', 'Pneu confortável para uso urbano', 'BRI003', 329.90, 419.90, 75, 'active', false,
 (SELECT id FROM categories WHERE slug = 'pneus'),
 (SELECT id FROM brands WHERE slug = 'bridgestone')),

('Goodyear Eagle F1 215/45R17', 'goodyear-eagle-f1-215-45r17', 'Pneu esportivo com tecnologia ActiveGrip. Aderência superior em curvas.', 'Pneu esportivo com aderência superior', 'GOO004', 429.90, 529.90, 45, 'active', true,
 (SELECT id FROM categories WHERE slug = 'pneus'),
 (SELECT id FROM brands WHERE slug = 'goodyear')),

('Firestone Firehawk 205/55R16', 'firestone-firehawk-205-55r16', 'Pneu esportivo acessível com excelente performance. Desenhado para entusiastas de carros.', 'Pneu esportivo acessível', 'FIR005', 289.90, 359.90, 60, 'active', false,
 (SELECT id FROM categories WHERE slug = 'pneus'),
 (SELECT id FROM brands WHERE slug = 'firestone')),

('Continental PremiumContact 6 205/55R16', 'continental-premiumcontact-6-205-55r16', 'Pneu premium com excelente equilíbrio entre segurança e conforto.', 'Pneu premium confortável', 'CON006', 419.90, 529.90, 40, 'active', true,
 (SELECT id FROM categories WHERE slug = 'pneus'),
 (SELECT id FROM brands WHERE slug = 'continental'))
ON CONFLICT (sku) DO NOTHING;

-- Inserir imagens dos produtos
INSERT INTO product_images (product_id, url, alt_text, sort_order) VALUES
((SELECT id FROM products WHERE sku = 'PIR001'), '/images/products/pirelli-p-zero-1.jpg', 'Pirelli P Zero vista frontal', 1),
((SELECT id FROM products WHERE sku = 'PIR001'), '/images/products/pirelli-p-zero-2.jpg', 'Pirelli P Zero vista lateral', 2),
((SELECT id FROM products WHERE sku = 'PIR001'), '/images/products/pirelli-p-zero-3.jpg', 'Pirelli P Zero detalhe do sulco', 3),

((SELECT id FROM products WHERE sku = 'MIC002'), '/images/products/michelin-pilot-4s-1.jpg', 'Michelin Pilot Sport 4S vista frontal', 1),
((SELECT id FROM products WHERE sku = 'MIC002'), '/images/products/michelin-pilot-4s-2.jpg', 'Michelin Pilot Sport 4S vista lateral', 2),
((SELECT id FROM products WHERE sku = 'MIC002'), '/images/products/michelin-pilot-4s-3.jpg', 'Michelin Pilot Sport 4S detalhe do sulco', 3),

((SELECT id FROM products WHERE sku = 'BRI003'), '/images/products/bridgestone-turanza-1.jpg', 'Bridgestone Turanza vista frontal', 1),
((SELECT id FROM products WHERE sku = 'BRI003'), '/images/products/bridgestone-turanza-2.jpg', 'Bridgestone Turanza vista lateral', 2),

((SELECT id FROM products WHERE sku = 'GOO004'), '/images/products/goodyear-eagle-f1-1.jpg', 'Goodyear Eagle F1 vista frontal', 1),
((SELECT id FROM products WHERE sku = 'GOO004'), '/images/products/goodyear-eagle-f1-2.jpg', 'Goodyear Eagle F1 vista lateral', 2),

((SELECT id FROM products WHERE sku = 'FIR005'), '/images/products/firestone-firehawk-1.jpg', 'Firestone Firehawk vista frontal', 1),
((SELECT id FROM products WHERE sku = 'FIR005'), '/images/products/firestone-firehawk-2.jpg', 'Firestone Firehawk vista lateral', 2),

((SELECT id FROM products WHERE sku = 'CON006'), '/images/products/continental-premiumcontact-1.jpg', 'Continental PremiumContact vista frontal', 1),
((SELECT id FROM products WHERE sku = 'CON006'), '/images/products/continental-premiumcontact-2.jpg', 'Continental PremiumContact vista lateral', 2)
ON CONFLICT DO NOTHING;

-- Inserir atributos dos produtos
INSERT INTO product_attributes (product_id, name, value) VALUES
((SELECT id FROM products WHERE sku = 'PIR001'), 'Largura', '205'),
((SELECT id FROM products WHERE sku = 'PIR001'), 'Altura', '55'),
((SELECT id FROM products WHERE sku = 'PIR001'), 'Aro', '16'),
((SELECT id FROM products WHERE sku = 'PIR001'), 'Índice de Carga', '91'),
((SELECT id FROM products WHERE sku = 'PIR001'), 'Índice de Velocidade', 'V'),
((SELECT id FROM products WHERE sku = 'PIR001'), 'Tipo', 'Passeio/Esportivo'),

((SELECT id FROM products WHERE sku = 'MIC002'), 'Largura', '225'),
((SELECT id FROM products WHERE sku = 'MIC002'), 'Altura', '45'),
((SELECT id FROM products WHERE sku = 'MIC002'), 'Aro', '17'),
((SELECT id FROM products WHERE sku = 'MIC002'), 'Índice de Carga', '94'),
((SELECT id FROM products WHERE sku = 'MIC002'), 'Índice de Velocidade', 'Y'),
((SELECT id FROM products WHERE sku = 'MIC002'), 'Tipo', 'Esportivo'),

((SELECT id FROM products WHERE sku = 'BRI003'), 'Largura', '195'),
((SELECT id FROM products WHERE sku = 'BRI003'), 'Altura', '65'),
((SELECT id FROM products WHERE sku = 'BRI003'), 'Aro', '15'),
((SELECT id FROM products WHERE sku = 'BRI003'), 'Índice de Carga', '91'),
((SELECT id FROM products WHERE sku = 'BRI003'), 'Índice de Velocidade', 'H'),
((SELECT id FROM products WHERE sku = 'BRI003'), 'Tipo', 'Passeio'),

((SELECT id FROM products WHERE sku = 'GOO004'), 'Largura', '215'),
((SELECT id FROM products WHERE sku = 'GOO004'), 'Altura', '45'),
((SELECT id FROM products WHERE sku = 'GOO004'), 'Aro', '17'),
((SELECT id FROM products WHERE sku = 'GOO004'), 'Índice de Carga', '87'),
((SELECT id FROM products WHERE sku = 'GOO004'), 'Índice de Velocidade', 'Y'),
((SELECT id FROM products WHERE sku = 'GOO004'), 'Tipo', 'Esportivo'),

((SELECT id FROM products WHERE sku = 'FIR005'), 'Largura', '205'),
((SELECT id FROM products WHERE sku = 'FIR005'), 'Altura', '55'),
((SELECT id FROM products WHERE sku = 'FIR005'), 'Aro', '16'),
((SELECT id FROM products WHERE sku = 'FIR005'), 'Índice de Carga', '91'),
((SELECT id FROM products WHERE sku = 'FIR005'), 'Índice de Velocidade', 'V'),
((SELECT id FROM products WHERE sku = 'FIR005'), 'Tipo', 'Esportivo'),

((SELECT id FROM products WHERE sku = 'CON006'), 'Largura', '205'),
((SELECT id FROM products WHERE sku = 'CON006'), 'Altura', '55'),
((SELECT id FROM products WHERE sku = 'CON006'), 'Aro', '16'),
((SELECT id FROM products WHERE sku = 'CON006'), 'Índice de Carga', '91'),
((SELECT id FROM products WHERE sku = 'CON006'), 'Índice de Velocidade', 'V'),
((SELECT id FROM products WHERE sku = 'CON006'), 'Tipo', 'Passeio')
ON CONFLICT DO NOTHING;

-- Inserir configurações da loja
INSERT INTO settings (key, value, description) VALUES
('store_name', 'Mercado Livre dos Pneus', 'Nome da loja'),
('store_description', 'Os melhores pneus e acessórios para seu veículo', 'Descrição da loja'),
('store_email', 'contato@mercadolivredospneus.com.br', 'Email de contato'),
('store_phone', '(11) 99999-9999', 'Telefone de contato'),
('store_address', 'São Paulo, SP', 'Endereço da loja'),
('shipping_cost_sao_paulo', '15.90', 'Custo de frete para São Paulo'),
('shipping_cost_other', '25.90', 'Custo de frete para outras cidades'),
('free_shipping_threshold', '500.00', 'Valor mínimo para frete grátis'),
('payment_methods', '["credit_card", "pix", "boleto"]', 'Métodos de pagamento aceitos'),
('mercado_pago_public_key', 'TEST-123456789', 'Chave pública do Mercado Pago'),
('mercado_pago_access_token', 'TEST-123456789', 'Token de acesso do Mercado Pago')
ON CONFLICT (key) DO NOTHING;