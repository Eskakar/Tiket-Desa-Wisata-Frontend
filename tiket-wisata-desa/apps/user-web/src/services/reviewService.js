import api from './api'

export const createReview =
  async (payload) => {
    const response = await api.post(
      '/reviews',
      payload
    )

    return response.data
  }