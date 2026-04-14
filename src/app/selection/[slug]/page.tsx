import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { SelectionDetail } from './SelectionDetail'

type Props = { params: { slug: string } }

const SELECTION_SLUGS = [
  'meilleurs-brunchs-kids-friendly',
  'fermes-pedagogiques',
  'vide-greniers-brocantes-enfants',
  'plus-belles-places-de-jeux',
  'piscines-parcs-aquatiques-enfants',
  'musees-gratuits-familles',
  'balades-faciles-poussette',
  'anniversaires-originaux',
  'stages-vacances-incontournables',
]

const SELECTION_META: Record<string, { title: string; description: string }> = {
  'meilleurs-brunchs-kids-friendly': { title: 'Top 10 des meilleurs brunchs kids friendly', description: 'Les adresses testées et approuvées par les familles pour bruncher en toute tranquillité.' },
  'fermes-pedagogiques': { title: 'Fermes pédagogiques à découvrir', description: 'Les plus belles fermes de Suisse romande.' },
  'vide-greniers-brocantes-enfants': { title: 'Les meilleurs vide-greniers et brocantes pour enfants', description: 'Jouets, vêtements, livres — les brocantes dédiées à l\'enfant.' },
  'plus-belles-places-de-jeux': { title: 'Les plus belles places de jeux de la région', description: 'Des aires de jeux originales et sécurisées.' },
  'piscines-parcs-aquatiques-enfants': { title: 'Piscines et parcs aquatiques pour enfants', description: 'Les meilleures piscines avec pataugeoires et toboggans.' },
  'musees-gratuits-familles': { title: 'Musées gratuits ou à petit prix pour les familles', description: 'Culture et découvertes sans se ruiner.' },
  'balades-faciles-poussette': { title: 'Balades faciles avec poussette', description: 'Des itinéraires accessibles pour se promener en famille.' },
  'anniversaires-originaux': { title: 'Anniversaires originaux : nos meilleures idées', description: 'Des lieux et activités pour un anniversaire mémorable.' },
  'stages-vacances-incontournables': { title: 'Stages vacances incontournables', description: 'Les stages créatifs, sportifs et nature les mieux notés.' },
}

export async function generateStaticParams() {
  return SELECTION_SLUGS.map(slug => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const meta = SELECTION_META[params.slug]
  if (!meta) return {}
  return {
    title: `${meta.title} — KIDIGO`,
    description: meta.description,
  }
}

export default function SelectionSlugPage({ params }: Props) {
  if (!SELECTION_SLUGS.includes(params.slug)) notFound()
  return <SelectionDetail slug={params.slug} />
}
