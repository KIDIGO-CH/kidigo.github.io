export type Category =
  | 'Sport'
  | 'Art créatif'
  | 'Musique'
  | 'Danse'
  | 'Science'
  | 'Ateliers'
  | 'Anniversaires'
  | 'Stages vacances'
  | 'Sorties famille'
  | 'Cafés-Restaurants kids friendly'
  | 'Animaux'
  | 'Parcs / Places de jeux'
  | 'Balades kids friendly'
  | 'Musées enfants'
  | 'Piscine'

export type EffortLevel = 'chill' | 'actif' | 'sportif'

export type AgeRange = '0-3 ans' | '4-6 ans' | '7-10 ans' | '11-14 ans' | 'Tous âges'

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
  npa: string
  canton: string
  lat: number
  lng: number
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
  effortLevel: EffortLevel
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
