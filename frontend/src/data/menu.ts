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
        title: 'TOYS & PLUSH',
        items: [
          { name: 'ALL TOYS', href: '/shop?category=toys' },
          { name: 'PLUSH TOYS', href: '/shop?category=plush-toys' },
          { name: 'KEYCHAINS', href: '/shop?category=keychains' },
        ],
      },
      {
        title: 'STATIONERY & GIFTS',
        items: [
          { name: 'STATIONARIES', href: '/shop?category=stationaries' },
          { name: 'ART & CRAFTS', href: '/shop?category=art-crafts' },
          { name: 'DIARY & JOURNALS', href: '/shop?category=diary' },
          { name: 'GIFTING', href: '/shop?category=gifting' },
        ],
      },
      {
        title: 'HOME & ACCESSORIES',
        items: [
          { name: 'HOME & LIVING', href: '/shop?category=home-living' },
          { name: 'HAIR ACCESSORIES', href: '/shop?category=hair-accessories' },
          { name: 'DRINKWARE', href: '/shop?category=drinkware' },
          { name: 'CANDLES', href: '/shop?category=candles' },
        ],
      },
    ],
    promoImage: {
      src: '/crafts/hero_stacking_toy.png',
      alt: 'Crafts Promo',
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
