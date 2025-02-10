import { NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });

    response.headers.set('Set-Cookie', 'session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
    
    return response;
}
