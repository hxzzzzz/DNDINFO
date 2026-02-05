import { NextRequest, NextResponse } from 'next/server';
import { INITIAL_REVIEWS } from '../../../constants';
import { Review } from '../../../types';

// Simple in-memory storage for the runtime of the server.
// In a real production app, connect this to a database (PostgreSQL, MongoDB, etc.)
let serverReviews = [...INITIAL_REVIEWS];

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const moduleId = searchParams.get('moduleId');

  if (moduleId) {
    const filtered = serverReviews.filter(r => r.moduleId === moduleId);
    // Sort by newest first
    const sorted = filtered.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return NextResponse.json(sorted);
  }

  return NextResponse.json(serverReviews);
}

export async function POST(request: NextRequest) {
  try {
    const body: Review = await request.json();
    
    // Basic validation
    if (!body.moduleId || !body.username || !body.content) {
        return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
    }

    // Add to "database"
    serverReviews.unshift(body);

    return NextResponse.json(body);
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}