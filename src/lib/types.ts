export type Category =
  | 'Sport'
  | 'Art créatif'
  | 'Musique'
  | 'Danse'
  | 'Science'
  | 'Nature'
  | 'Ateliers'
  | 'Anniversaires'
  | 'Stages vacances'
  | 'Sorties famille'

export type AgeRange = '2-4 ans' | '5-7 ans' | '8-10 ans' | '11-14 ans' | 'Tous âges'

export type Activity = {
  id: string
  slug: string
  name: string
  category: Category
  ageMin: number
  ageMax: number
  ageLabel: AgeRange
  city: string
  district: string
  price: number
  priceLabel: string
  rating: number
  reviewCount: number
  image: string
  description: string
  shortDescription: string
  tags: string[]
  nextDate: string
  duration: string
  organizer: Organizer
  isIndoor: boolean
  isFeatured: boolean
  isPopular: boolean
  isCoupDeCoeur: boolean
  isNew?: boolean
  availableSlots: number
  benefits: string[]
  practical: PracticalInfo
}

export type Organizer = {
  id: string
  name: string
  logo: string
  rating: number
  reviewCount: number
  activitiesCount: number
  verified: boolean
  description: string
}

export type PracticalInfo = {
  address: string
  transport: string
  equipment: string
  toProvide: string
}

export type SearchFilters = {
  query: string
  city: string
  category: Category | ''
  ageMin: number | null
  ageMax: number | null
  priceMax: number | null
  isIndoor: boolean | null
  date: string
  sortBy: 'rating' | 'price-asc' | 'price-desc' | 'popular' | 'newest'
}
