import pool from "@/app/api/db"
import { NextResponse } from "next/server"


export async function GET(request) {
   const { searchParams } = new URL(request.url)
   const user_id = searchParams.get('user_id')

   if (!user_id) {
       return NextResponse.json({ bool: false, message: "user_id is required" })
   }    

   try {
       const data = await pool.query(`SELECT * FROM favourite WHERE user_id = $1`, [user_id])
       if (data.rows.length === 0) {
           return NextResponse.json({ bool: true, data: [] })
       }

       const favourites = data.rows.map(async(favourite) => {
            const productRes = await pool.query(`
                SELECT * FROM products WHERE product_id = $1
            `, [favourite.product_id])

            return { saved_item: favourite, product: productRes.rows[0] || null };
       })
       const response = await Promise.all(favourites);

       return NextResponse.json({data: response, bool: true}, { status: 200 });

   } catch (error) {
       return NextResponse.json({ bool: false, message: error })
   } 
}