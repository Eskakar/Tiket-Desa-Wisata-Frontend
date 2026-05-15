import api from './api'

export const uploadPaymentProof =
  async (payload) => {
    const response = await api.post(
      '/payments/upload',
      payload
    )

    return response.data
  }