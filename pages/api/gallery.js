import { getGallery,saveImage } from "../../utils/gallery"

export const config = {
  api: {
      bodyParser: {
          sizeLimit: '1mb' // Set desired value here
      }
  }
}

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
      // case 'POST':
      //   // const savefile = await saveImage(req)
      //   console.log(req)
      //   res.status(200).json({ id:1 })
      //   break
      default:
        res.setHeader('Allow', ['GET', 'POST'])
        res.status(405).end(`Method ${method} Not Allowed`)
    }
   
  }
  