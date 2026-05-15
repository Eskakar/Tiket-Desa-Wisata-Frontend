import api from './api'

export const getMyTickets =
  async () => {
    const response = await api.get(
      '/my-tickets'
    )

    return response.data
  }