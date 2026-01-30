'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

import { currentUser } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

// Helper to get current user's company
async function getCurrentUserCompany() {
  const user = await currentUser()
  if (!user) return null

  // Find company where authId matches current user's ID
  const company = await prisma.company.findFirst({
    where: { authId: user.id }
  })

  return company
}

// Company Actions
export async function createCompany(formData: FormData) {
  const user = await currentUser()
  if (!user) return

  const name = formData.get('name') as string
  const companyId = crypto.randomUUID() // Auto-generate company ID
  const authId = user.id

  try {
    await prisma.company.create({
      data: {
        name,
        companyId,
        authId,
      },
    })
    revalidatePath('/dashboard')
    revalidatePath('/admin')
  } catch (error) {
    console.error('Failed to create company:', error)
  }
}

export async function checkCompanyProfile() {
  const user = await currentUser()
  if (!user) return false

  const company = await prisma.company.findFirst({
    where: { authId: user.id }
  })

  return !!company
}

export async function getCompanies() {
  try {
    const companies = await prisma.company.findMany()
    return { success: true, data: companies }
  } catch (error) {
    console.error('Failed to fetch companies:', error)
    return { success: false, error: 'Failed to fetch companies' }
  }
}

// User Actions
export async function createUser(formData: FormData) {
  const company = await getCurrentUserCompany()
  if (!company) {
    console.error('No company found for current user')
    return
  }

  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const phoneNumber = formData.get('phoneNumber') as string
  const userId = crypto.randomUUID() // Auto-generate user ID
  const addedBy = company.authId // The auth ID of the admin who added them

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        userId,
        phoneNumber,
        companyId: company.id,
        addedBy,
      },
    })
    revalidatePath('/dashboard')
    revalidatePath('/admin')
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}

export async function getUsers() {
  const company = await getCurrentUserCompany()
  if (!company) return { success: true, data: [] }

  try {
    const users = await prisma.user.findMany({
      where: { companyId: company.id },
      include: { company: true }
    })
    return { success: true, data: users }
  } catch (error) {
    console.error('Failed to fetch users:', error)
    return { success: false, error: 'Failed to fetch users' }
  }
}

// Trip Actions
export async function createTrip(formData: FormData) {
  const company = await getCurrentUserCompany()
  if (!company) {
    console.error('No company found for current user')
    return
  }

  const startDate = new Date(formData.get('startDate') as string)
  const endDate = new Date(formData.get('endDate') as string)
  const startingPoint = formData.get('startingPoint') as string
  const destination = formData.get('destination') as string
  const budget = parseFloat(formData.get('budget') as string)
  const participantIds = formData.getAll('participantIds') as string[] 

  try {
    await prisma.trip.create({
      data: {
        startDate,
        endDate,
        startingPoint,
        destination,
        budget,
        companyId: company.id,
        participants: {
          create: participantIds.map((userId) => ({
            userId,
          })),
        },
      },
    })
    revalidatePath('/dashboard')
    revalidatePath('/admin')
  } catch (error) {
    console.error('Failed to create trip:', error)
  }
}

export async function getTrips() {
  const company = await getCurrentUserCompany()
  if (!company) return { success: true, data: [] }

  try {
    const trips = await prisma.trip.findMany({
      where: { companyId: company.id },
      include: { 
        company: true, 
        participants: {
          include: {
            user: true
          }
        } 
      }
    })
    return { success: true, data: trips }
  } catch (error) {
    console.error('Failed to fetch trips:', error)
    return { success: false, error: 'Failed to fetch trips' }
  }
}
