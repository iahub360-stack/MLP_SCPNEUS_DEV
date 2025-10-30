'use client';

import { Hero } from '@/components/sections/hero';
import { Categories } from '@/components/sections/categories';
import { FeaturedProducts } from '@/components/sections/featured-products';
import { Benefits } from '@/components/sections/benefits';
import { Newsletter } from '@/components/sections/newsletter';

export default function Home() {
  return (
    <div className="min-h-screen scroll-smooth">
      <main>
        <Hero />
        <Categories />
        <FeaturedProducts />
        <Benefits />
        <Newsletter />
      </main>
    </div>
  );
}