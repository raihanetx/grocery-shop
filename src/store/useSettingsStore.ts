import { create } from 'zustand'
import { Settings } from '@/types'

interface SettingsState {
  settings: Settings
  updateSettings: (data: Partial<Settings>) => void
  resetSettings: () => void
}

// Default settings from AdminDashboard.tsx
const defaultSettings: Settings = {
  websiteName: 'GroceryHub',
  slogan: 'Freshness at your door',
  faviconUrl: '',
  insideDhakaDelivery: 60,
  outsideDhakaDelivery: 120,
  freeDeliveryMin: 1000,
  whatsappNumber: '',
  phoneNumber: '',
  facebookUrl: '',
  messengerUsername: '',
  aboutUs: '',
  termsConditions: '',
  refundPolicy: '',
  privacyPolicy: ''
}

export const useSettingsStore = create<SettingsState>((set) => ({
  settings: { ...defaultSettings },

  updateSettings: (data: Partial<Settings>) => {
    set((state) => ({
      settings: { ...state.settings, ...data }
    }))
  },

  resetSettings: () => {
    set({ settings: { ...defaultSettings } })
  }
}))

// Credentials management (separate from main settings)
export interface Credentials {
  username: string
  currentPassword: string
  newPassword: string
  confirmPassword: string
  apiKey: string
  secretKey: string
  webhookUrl: string
}

interface CredentialsState {
  credentials: Credentials
  updateCredentials: (data: Partial<Credentials>) => void
  resetPasswordFields: () => void
}

const defaultCredentials: Credentials = {
  username: 'admin_main',
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
  apiKey: 'pk_test_8f7d6a5s4d3f2g1h',
  secretKey: 'sk_test_1a2b3c4d5e6f7g8h',
  webhookUrl: 'https://myshop.com/webhooks/delivery'
}

export const useCredentialsStore = create<CredentialsState>((set) => ({
  credentials: { ...defaultCredentials },

  updateCredentials: (data: Partial<Credentials>) => {
    set((state) => ({
      credentials: { ...state.credentials, ...data }
    }))
  },

  resetPasswordFields: () => {
    set((state) => ({
      credentials: {
        ...state.credentials,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      }
    }))
  }
}))
