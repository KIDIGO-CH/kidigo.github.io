export type Product = {
  id: string
  name: string
  price: number
  category: 'Hauts' | 'Bas' | 'Vestes' | 'Accessoires'
  sizes: string[]
  image: string
  isNew?: boolean
  isSoldOut?: boolean
  description: string
  material: string
}

export const products: Product[] = [
  {
    id: 'frz-001',
    name: 'Arctic Cargo Pant',
    price: 189,
    category: 'Bas',
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/frz-001/800/1100',
    isNew: true,
    description: 'Cargo technique, coupe ample. Ripstop déperlant, six poches.',
    material: '100% Nylon ripstop',
  },
  {
    id: 'frz-002',
    name: 'Subzero Hoodie',
    price: 149,
    category: 'Hauts',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/frz-002/700/1000',
    isNew: true,
    description: 'Hoodie oversize lourd. Double épaisseur, intérieur brossé.',
    material: '400g French Terry',
  },
  {
    id: 'frz-003',
    name: 'Cold Wave Tee',
    price: 79,
    category: 'Hauts',
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://picsum.photos/seed/frz-003/600/750',
    description: 'Tee oversize en coton lourd. Coutures renforcées, col dropped.',
    material: '220g Coton peigné',
  },
  {
    id: 'frz-004',
    name: 'Frost Shell Jacket',
    price: 349,
    category: 'Vestes',
    sizes: ['S', 'M', 'L'],
    image: 'https://picsum.photos/seed/frz-004/800/950',
    isSoldOut: true,
    description: 'Shell technique waterproof. Zip YKK, coutures soudées imperméables.',
    material: 'Gore-Tex 3 couches',
  },
  {
    id: 'frz-005',
    name: 'Glacier Cap',
    price: 59,
    category: 'Accessoires',
    sizes: ['Unique'],
    image: 'https://picsum.photos/seed/frz-005/600/700',
    isNew: true,
    description: 'Casquette 6 panneaux structurée. Logo brodé ton sur ton.',
    material: 'Coton twill 100%',
  },
  {
    id: 'frz-006',
    name: 'Permafrost Shorts',
    price: 109,
    category: 'Bas',
    sizes: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/frz-006/700/875',
    description: 'Short technique avec poches cargo latérales zippées.',
    material: 'Ripstop léger déperlant',
  },
]

export const collection = {
  name: 'ICE AGE',
  number: '02',
  season: 'Printemps — Été 2025',
  description: 'Deuxième capsule Freez. Conçue pour ceux qui refusent le confort du banal.',
}

export const stats = [
  { value: '6', label: 'Pièces' },
  { value: '02', label: 'Drop' },
  { value: '100%', label: 'Limitées' },
]
