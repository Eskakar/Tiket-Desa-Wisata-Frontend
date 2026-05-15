import api from './api'

export const getFeaturedWisata = async () => {
    const response = await api.get('/wisata/featured')

    return response.data
}