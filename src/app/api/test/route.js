import dbConnect from '@/lib/mongodb';

export async function GET() {
  try {
    await dbConnect();
    return Response.json({ message: 'Connected to MongoDB!' });
  } catch (error) {
    console.error('❌ Error in /api/test:', error.message);
    return Response.json({ error: error.message || 'Connection failed!' }, { status: 500 });
  }
}
