import { NextResponse } from 'next/server';
import { db } from '@/lib/db';

export async function POST() {
  try {
    // Create categories
    const categories = await Promise.all([
      db.category.create({
        data: {
          name: 'Pneus Camioneta',
          slug: 'pneus-camioneta',
          description: 'Pneus robustos para 4x4, SUVs e caminhonetes'
        }
      }),
      db.category.create({
        data: {
          name: 'Pneus Carro',
          slug: 'pneus-carro',
          description: 'Pneus de alto desempenho para veículos de passeio'
        }
      }),
      db.category.create({
        data: {
          name: 'Pneus Moto',
          slug: 'pneus-moto',
          description: 'Pneus esportivos e de touring para motocicletas'
        }
      })
    ]);

    // Create products
    const products = [
      {
        sku: 'XBRI-BRUTUS-205-70R15',
        name: 'Pneu XBRI BRUTUS T/A LT 205/70R15 8PR 102/99Q Letra Branca',
        slug: 'pneu-xbri-brutus-ta-lt-205-70r15-8pr-102-99q-letra-branca',
        description: 'Xbri Brutus T/A.\n\nEstabilidade e controle excepcionais para qualquer terreno. Design agressivo com off-road superior e desempenho em estrada. Construção robusta para máxima durabilidade.',
        price: 410.00,
        brand: 'XBRI',
        categoryId: categories[0].id,
        images: JSON.stringify([
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_4_imkwcy.png'
        ]),
        stock: 50,
        featured: true
      },
      {
        sku: 'XBRI-BRUTUS-245-70R16',
        name: 'Pneu XBRI BRUTUS T/A LT 245/70R16 8PR 113/110S Letra Branca',
        slug: 'pneu-xbri-brutus-ta-lt-245-70r16-8pr-113-110s-letra-branca',
        description: 'Xbri Brutus T/A.\n\nMáxima performance para veículos pesados. Tração superior em terrenos difíceis e conforto excepcional em estradas de asfalto.',
        price: 550.00,
        brand: 'XBRI',
        categoryId: categories[0].id,
        images: JSON.stringify([
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_4_imkwcy.png'
        ]),
        stock: 35,
        featured: true
      },
      {
        sku: 'PIRELLI-SCORPION-265-65R17',
        name: 'Pneu Pirelli Scorpion ATR 265/65R17 112H',
        slug: 'pneu-pirelli-scorpion-atr-265-65r17-112h',
        description: 'Pirelli Scorpion ATR.\n\nVersatilidade máxima para qualquer tipo de terreno. Tecnologia italiana com desempenho excepcional tanto off-road quanto em asfalto.',
        price: 680.00,
        brand: 'Pirelli',
        categoryId: categories[0].id,
        images: JSON.stringify([
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png'
        ]),
        stock: 25,
        featured: false
      },
      {
        sku: 'MICHELIN-PILOT-205-55R16',
        name: 'Pneu Michelin Pilot Sport 4 205/55R16 91W',
        slug: 'pneu-michelin-pilot-sport-4-205-55r16-91w',
        description: 'Michelin Pilot Sport 4.\n\nAlto desempenho esportivo com máxima precisão nas curvas. Tecnologia de ponta para carros esportivos e sedans de luxo.',
        price: 420.00,
        brand: 'Michelin',
        categoryId: categories[1].id,
        images: JSON.stringify([
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_4_imkwcy.png'
        ]),
        stock: 40,
        featured: true
      },
      {
        sku: 'BRIDGESTONE-POTENZA-225-45R17',
        name: 'Pneu Bridgestone Potenza RE050A 225/45R17 91W',
        slug: 'pneu-bridgestone-potenza-re050a-225-45r17-91w',
        description: 'Bridgestone Potenza RE050A.\n\nControle esportivo e resposta precisa. Desenvolvido para máxima performance em altas velocidades.',
        price: 485.00,
        brand: 'Bridgestone',
        categoryId: categories[1].id,
        images: JSON.stringify([
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_3_t5qskt.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663640/Pneu_XBRI_BRUTUS_TA_2_u0wsjg.png'
        ]),
        stock: 30,
        featured: false
      },
      {
        sku: 'MICHELIN-ROAD-120-70R17',
        name: 'Pneu Michelin Road 5 120/70R17 58W',
        slug: 'pneu-michelin-road-5-120-70r17-58w',
        description: 'Michelin Road 5.\n\nSegurança máxima em todas as condições climáticas. Tecnologia XST+ para frenagem otimizada em pista molhada.',
        price: 380.00,
        brand: 'Michelin',
        categoryId: categories[2].id,
        images: JSON.stringify([
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_4_imkwcy.png',
          'https://res.cloudinary.com/dhwqfkhzm/image/upload/v1761663639/Pneu_XBRI_BRUTUS_TA_1_mqwbqx.png'
        ]),
        stock: 20,
        featured: true
      }
    ];

    const createdProducts = await Promise.all(
      products.map(product => db.product.create({ data: product }))
    );

    return NextResponse.json({
      message: 'Database seeded successfully',
      categories: categories.length,
      products: createdProducts.length
    });
  } catch (error) {
    console.error('Error seeding database:', error);
    return NextResponse.json(
      { error: 'Failed to seed database' },
      { status: 500 }
    );
  }
}