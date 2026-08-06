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
        title: 'CRAFTS & STATIONERY',
        items: [
          { name: 'STATIONERY', href: '/shop?category=stationery' },
          { name: 'ART & CRAFT', href: '/shop?category=art-craft' },
          { name: 'GIFTING', href: '/shop?category=gifting' },
        ],
      },
      {
        title: 'ACCESSORIES & LIVING',
        items: [
          { name: 'DRINKWARE', href: '/shop?category=drinkware' },
          { name: 'HAIR ACCESSORIES', href: '/shop?category=hair-accessories' },
          { name: 'BAGS & POUCHES', href: '/shop?category=bags-pouches' },
          { name: 'HOME & LIVING', href: '/shop?category=home-living' },
        ],
      },
      {
        title: 'TOYS & PLUSH',
        items: [
          { name: 'PLUSH TOYS', href: '/shop?category=plush-toys' },
          { name: 'KEYCHAINS', href: '/shop?category=keychains' },
        ],
      },
    ],
    promoImage: {
      src: '/crafts/crafts_hero_cover.png',
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
