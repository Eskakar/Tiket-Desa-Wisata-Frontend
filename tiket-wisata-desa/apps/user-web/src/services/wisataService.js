import api from './api'

export const getFeaturedWisata = async () => {
    const response = await api.get('/wisata/featured')

    return response.data
}

export const getAllWisata = async (
  page = 1
) => {
  const response = await api.get(
    `/wisata?page=${page}`
  )

  return response.data
}

export const searchWisata = async (
  query,
  page = 1
) => {
  const response = await api.get(
    `/wisata/search?q=${query}&page=${page}`
  )

  return response.data
}

export const getWisataByTag = async (
  tag,
  page = 1
) => {
  const response = await api.get(
    `/wisata/tag/${tag}?page=${page}`
  )

  return response.data
}

export const getWisataDetail = async (
  slug
) => {
  const response = await api.get(
    `/wisata/${slug}`
  )

  return response.data
}