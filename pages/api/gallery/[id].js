import { getGallery } from "../../../utils/gallery"


export default async function handler(req, res) {
    
    const {
      query: { id },
      method,
    } = req

    switch (method) {
      case 'GET':
        const allGallery = await getGallery()
        res.status(200).json(allGallery)
        break
      default:
        res.setHeader('Allow', ['GET'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
   
  }
  