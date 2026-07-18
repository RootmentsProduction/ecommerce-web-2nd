import { MenuItem } from '../types/menu';

export const menuItems: MenuItem[] = [
  {
    name: 'Shop',
    href: '/shop',
  },
  {
    name: 'Collections',
    href: '/shop',
    hasMegaMenu: true,
    megaMenuColumns: [
      {
        title: 'EARRINGS',
        items: [
          { name: 'ALL EARRINGS', href: '/shop?category=earrings' },
          { name: 'HOOPS', href: '/shop?category=earrings&type=hoops' },
          { name: 'STUDS', href: '/shop?category=earrings&type=studs' },
          { name: 'DANGLER', href: '/shop?category=earrings&type=dangler' },
          { name: 'EARCUFFS AND CRAWLERS', href: '/shop?category=earrings&type=crawlers' },
        ],
      },
      {
        title: 'NECKLACES',
        items: [
          { name: 'ALL NECKLACES', href: '/shop?category=necklaces' },
          { name: 'PENDENTS', href: '/shop?category=necklaces&type=pendents' },
          { name: 'CHAIN', href: '/shop?category=necklaces&type=chain' },
          { name: 'CHOKER', href: '/shop?category=necklaces&type=choker' },
          { name: 'LAYERED NECKLACE', href: '/shop?category=necklaces&type=layered' },
          { name: 'INITIALS', href: '/shop?category=necklaces&type=initials' },
        ],
      },
      {
        title: 'RINGS',
        items: [
          { name: 'ALL RINGS', href: '/shop?category=rings' },
          { name: 'STACKABLE RINGS', href: '/shop?category=rings&type=stackable' },
          { name: 'ADJUSTABLE RINGS', href: '/shop?category=rings&type=adjustable' },
        ],
        secondarySection: {
          title: 'BRACELETS',
          items: [
            { name: 'ALL BRACELETS', href: '/shop?category=bracelets' },
            { name: 'KADA', href: '/shop?category=bracelets&type=kada' },
            { name: 'CHAIN', href: '/shop?category=bracelets&type=chain' },
          ],
        },
      },
    ],
    promoImage: {
      src: '/product-main.png',
      alt: 'Luxury Jewellery Promo',
      title: '',
      subtitle: '',
      href: '/shop',
    },
  },
  {
    name: 'Contact',
    href: '#footer',
  },
  {
    name: 'Blog',
    href: '#',
  },
];
