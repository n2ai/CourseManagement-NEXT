import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
import { json } from 'stream/consumers';
 
export async function POST(request: Request) {
  console.log(JSON.parse(request.content))

  return NextResponse.json('Got the call')
}