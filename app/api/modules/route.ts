import { NextResponse } from 'next/server';
import { MOCK_MODULES } from '../../../constants';

// Handle GET /api/modules
export async function GET() {
  // In a real application, you would query a database here.
  // Example: const modules = await prisma.module.findMany();
  
  return NextResponse.json(MOCK_MODULES);
}