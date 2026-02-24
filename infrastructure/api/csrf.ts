import { apiClient } from './client'

let csrfInitialized = false

export async function initCsrf() {
  if (csrfInitialized) return

  await apiClient.get('/sanctum/csrf-cookie')
  csrfInitialized = true
}
