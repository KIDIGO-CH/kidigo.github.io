import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { activities } from '@/lib/data'
import { ActivityDetail } from './ActivityDetail'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return activities.map(a => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const activity = activities.find(a => a.slug === params.slug)
  if (!activity) return {}
  return {
    title: `${activity.name} — ${activity.city}`,
    description: activity.shortDescription,
  }
}

export default function ActivityPage({ params }: Props) {
  const activity = activities.find(a => a.slug === params.slug)
  if (!activity) notFound()
  return <ActivityDetail activity={activity} />
}
