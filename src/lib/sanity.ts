import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: 'dmupx62x', // Replace with your Sanity project ID
  dataset: 'production',
  useCdn: true, // Use CDN for faster response times
  apiVersion: '2024-01-01', // Use current date for API version
})

// Helper function to get image URL from Sanity
export function getSanityImageUrl(source: any) {
  if (!source?.asset?._ref) return ''
  
  const [, id, dimensions, format] = source.asset._ref.split('-')
  const [width, height] = dimensions.split('x')
  
  return `https://cdn.sanity.io/images/${sanityClient.config().projectId}/${sanityClient.config().dataset}/${id}-${width}x${height}.${format}`
}

// Type definitions for Sanity documents
export interface SanityEvent {
  _id: string
  title: string
  slug: { current: string }
  date: string
  endDate?: string
  location: string
  description: string
  status: 'open' | 'coming-soon' | 'completed' | 'cancelled'
  image?: any
  gallery?: any[]
  registrationLink?: string
}

export interface SanityWorkshop {
  _id: string
  title: string
  slug: { current: string }
  level: 'beginner' | 'intermediate' | 'advanced'
  description: string
  duration: number
  instructor?: string
  learningOutcomes?: string[]
  prerequisites?: string
  software?: string[]
  image?: any
  availableSpots?: number
  nextSession?: string
}

export interface SanityCommitteeMember {
  _id: string
  name: string
  position: string
  role: 'faculty' | 'executive' | 'member'
  department: string
  year?: string
  email?: string
  bio?: string
  image?: any
  linkedin?: string
  order?: number
}

export interface SanityAlumniProfile {
  _id: string
  name: string
  graduationYear: number
  degree: string
  currentPosition: string
  company: string
  bio: string
  achievements?: string[]
  image?: any
  linkedin?: string
  email?: string
  featured?: boolean
}

// Query functions
export const getEvents = async () => {
  return await sanityClient.fetch<SanityEvent[]>(`
    *[_type == "event"] | order(date desc) {
      _id,
      title,
      slug,
      date,
      endDate,
      location,
      description,
      status,
      image,
      gallery,
      registrationLink
    }
  `)
}

export const getWorkshops = async () => {
  return await sanityClient.fetch<SanityWorkshop[]>(`
    *[_type == "workshop"] | order(nextSession desc) {
      _id,
      title,
      slug,
      level,
      description,
      duration,
      instructor,
      learningOutcomes,
      prerequisites,
      software,
      image,
      availableSpots,
      nextSession
    }
  `)
}

export const getCommitteeMembers = async () => {
  return await sanityClient.fetch<SanityCommitteeMember[]>(`
    *[_type == "committeeMember"] | order(order asc, name asc) {
      _id,
      name,
      position,
      role,
      department,
      year,
      email,
      bio,
      image,
      linkedin,
      order
    }
  `)
}

export const getAlumniProfiles = async () => {
  return await sanityClient.fetch<SanityAlumniProfile[]>(`
    *[_type == "alumniProfile"] | order(graduationYear desc) {
      _id,
      name,
      graduationYear,
      degree,
      currentPosition,
      company,
      bio,
      achievements,
      image,
      linkedin,
      email,
      featured
    }
  `)
}

// New content queries
export interface SanityHomeContent {
  heroTitle: string
  heroSubtitle: string
  heroDescription: string
  heroImage?: any
  stats?: Array<{ label: string; value: string; icon: string }>
  featuredUpdates?: any[]
}

export interface SanityAboutContent {
  mission: string
  vision: string
  communityDescription: string
  activities?: Array<{ title: string; description: string }>
}

export interface SanityJoinContent {
  benefits?: Array<{ title: string; description: string; icon: string }>
  contactEmail?: string
  officeLocation?: string
  officeHours?: string
}

export const getHomeContent = async () => {
  return await sanityClient.fetch<SanityHomeContent>(`
    *[_type == "homeContent"][0] {
      heroTitle,
      heroSubtitle,
      heroDescription,
      heroImage,
      stats,
      featuredUpdates
    }
  `)
}

export const getAboutContent = async () => {
  return await sanityClient.fetch<SanityAboutContent>(`
    *[_type == "aboutContent"][0] {
      mission,
      vision,
      communityDescription,
      activities
    }
  `)
}

export const getJoinContent = async () => {
  return await sanityClient.fetch<SanityJoinContent>(`
    *[_type == "joinContent"][0] {
      benefits,
      contactEmail,
      officeLocation,
      officeHours
    }
  `)
}
