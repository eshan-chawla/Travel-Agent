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
    return { success: true }
  } catch (error) {
    console.error('Failed to create company:', error)
    return { success: false, error: 'Failed to create company' }
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
       return { success: false, error: 'Company not found' }
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
    return { success: true }
  } catch (error) {
    console.error('Failed to create user:', error)
    return { success: false, error: 'Failed to create user' }
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
  const userId = formData.get('userId') as string // Internal DB ID of the user
  const tripId = formData.get('tripId') as string

  try {
    await prisma.trip.create({
      data: {
        tripId,
        startDate,
        endDate,
        startingPoint,
        destination,
        budget,
        companyId,
        userId,
      },
    })
    revalidatePath('/dashboard')
    return { success: true }
  } catch (error) {
    console.error('Failed to create trip:', error)
    return { success: false, error: 'Failed to create trip' }
  }
}

export async function getTrips() {
  try {
    const trips = await prisma.trip.findMany({
      include: { company: true, user: true }
    })
    return { success: true, data: trips }
  } catch (error) {
    console.error('Failed to fetch trips:', error)
    return { success: false, error: 'Failed to fetch trips' }
  }
}
