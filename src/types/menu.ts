export interface SubMenuItem {
  name: string;
  href: string;
}

export interface MenuColumn {
  title: string;
  items: SubMenuItem[];
  secondarySection?: {
    title: string;
    items: SubMenuItem[];
  };
}

export interface MenuItem {
  name: string;
  href: string;
  hasMegaMenu?: boolean;
  megaMenuColumns?: MenuColumn[];
  promoImage?: {
    src: string;
    alt: string;
    title: string;
    subtitle: string;
    href: string;
  };
}
