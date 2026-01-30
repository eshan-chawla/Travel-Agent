'use server'

import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

// Company Actions
export async function createCompany(formData: FormData) {
  const name = formData.get('name') as string
  const companyId = formData.get('companyId') as string
  const authId = formData.get('authId') as string

  try {
    await prisma.company.create({
      data: {
        name,
        companyId,
        authId,
      },
    })
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('Failed to create company:', error)
  }
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
  const name = formData.get('name') as string
  const email = formData.get('email') as string
  const userId = formData.get('userId') as string
  const phoneNumber = formData.get('phoneNumber') as string
  const companyId = formData.get('companyId') as string
  const addedBy = formData.get('addedBy') as string

  try {
    // Ensure company exists first
    const company = await prisma.company.findUnique({
      where: { id: companyId }
    })
    
    if (!company) {
       console.error('Company not found')
       return
    }

    await prisma.user.create({
      data: {
        name,
        email,
        userId,
        phoneNumber,
        companyId,
        addedBy,
      },
    })
    revalidatePath('/dashboard')
  } catch (error) {
    console.error('Failed to create user:', error)
  }
}

export async function getUsers() {
  try {
    const users = await prisma.user.findMany({
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
  const startDate = new Date(formData.get('startDate') as string)
  const endDate = new Date(formData.get('endDate') as string)
  const startingPoint = formData.get('startingPoint') as string
  const destination = formData.get('destination') as string
  const budget = parseFloat(formData.get('budget') as string)
  const companyId = formData.get('companyId') as string
  const participantIds = formData.getAll('participantIds') as string[] // Expect multiple selected user IDs

  try {
    const trip = await prisma.trip.create({
      data: {
        startDate,
        endDate,
        startingPoint,
        destination,
        budget,
        companyId,
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
  try {
    const trips = await prisma.trip.findMany({
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
