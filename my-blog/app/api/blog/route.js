import db from '../../lib/db'
import Blog from '../../models/Blog'

export async function GET(req) {
    //yhdistää mongoon
    await db.connect
    try {
        //saa datan mongosta ja etsii max 16 
        const blogs = await Blog.find({}).limit(16)
        return new Response(JSON.stringify(blogs), {status: 200})
    } catch (error) {
        return new Response(JSON.stringify(null), {status: 500})
    }
}

// yhdistää mongoon ja lisää uuden Blog objectin, palauttaa JSON

export async function POST(req) {
    await db.connect()
   try {
    const body = await req.json()
    const newBlog = await Blog.create(body)

    return new Response(JSON.stringify(newBlog), {status: 201})

    
   } catch (error) {
    return new Response(JSON.stringify(error.message), {status: 500})
   }
}