'use server'

import { createClient } from '@/lib/supabase/server'
import { revalidatePath } from 'next/cache'
import type { Database } from '@/lib/supabase/types'

export interface ContactFormData {
  name: string
  email: string
  phone?: string
  service?: string
  message: string
}

export async function submitContactForm(formData: ContactFormData) {
  try {
    const supabase = await createClient()

    type ContactMessageInsert = Database['public']['Tables']['contact_messages']['Insert']

    const insertData: ContactMessageInsert = {
      name: formData.name,
      email: formData.email,
      phone: formData.phone || null,
      service: formData.service || null,
      message: formData.message,
    }

    const { error } = await supabase.from('contact_messages').insert(insertData as any)

    if (error) {
      console.error('Error submitting contact form:', error)
      return {
        success: false,
        message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
      }
    }

    revalidatePath('/kontak')

    return {
      success: true,
      message: 'Pesan Anda telah terkirim. Kami akan menghubungi Anda segera.',
    }
  } catch (error) {
    console.error('Error submitting contact form:', error)
    return {
      success: false,
      message: 'Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.',
    }
  }
}
