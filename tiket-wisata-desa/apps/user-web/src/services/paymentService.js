import api from './api'

export const uploadFile =
  async (file) => {
    const formData = new FormData()

    formData.append('file', file)

    const response = await api.post(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type':
            'multipart/form-data',
        },
      }
    )

    return response.data
  }

export const uploadPaymentProof =
  async (payload) => {
    const response = await api.post(
      '/payments/upload',
      payload
    )

    return response.data
  }