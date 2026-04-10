export type Product = {
  id: string
  name: string
  price: number
  category: string
  size: string[]
  image: string
  isNew?: boolean
  isSoldOut?: boolean
}

export type Collection = {
  id: string
  name: string
  season: string
  description: string
  products: Product[]
}

export const products: Product[] = [
  {
    id: 'frz-001',
    name: 'Arctic Cargo Pant',
    price: 189,
    category: 'Bas',
    size: ['XS', 'S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/frz001/600/800',
    isNew: true,
  },
  {
    id: 'frz-002',
    name: 'Subzero Hoodie',
    price: 149,
    category: 'Hauts',
    size: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/frz002/600/800',
    isNew: true,
  },
  {
    id: 'frz-003',
    name: 'Frost Shell Jacket',
    price: 349,
    category: 'Vestes',
    size: ['S', 'M', 'L'],
    image: 'https://picsum.photos/seed/frz003/600/800',
    isSoldOut: true,
  },
  {
    id: 'frz-004',
    name: 'Cold Wave Tee',
    price: 79,
    category: 'Hauts',
    size: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    image: 'https://picsum.photos/seed/frz004/600/800',
  },
  {
    id: 'frz-005',
    name: 'Glacier Cap',
    price: 59,
    category: 'Accessoires',
    size: ['Unique'],
    image: 'https://picsum.photos/seed/frz005/600/800',
    isNew: true,
  },
  {
    id: 'frz-006',
    name: 'Permafrost Shorts',
    price: 109,
    category: 'Bas',
    size: ['S', 'M', 'L', 'XL'],
    image: 'https://picsum.photos/seed/frz006/600/800',
  },
]

export const currentCollection: Collection = {
  id: 'col-001',
  name: 'ICE AGE 01',
  season: 'Automne — Hiver 2024',
  description:
    'Première capsule Freez. Six pièces. Zéro compromis. Conçue pour ceux qui refusent le confort du banal.',
  products,
}

export const stats = [
  { label: 'Pièces par drop', value: '6' },
  { label: 'Drops par an', value: '4' },
  { label: 'Éditions limitées', value: '100%' },
]
