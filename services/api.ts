import { ModuleData, Review } from '../types';

// ==========================================
// API Configuration
// ==========================================

const API_BASE_URL = '/api';
const LOCAL_STORAGE_KEY = 'dragonvault_user_reviews';

// ==========================================
// API Methods
// ==========================================

/**
 * Fetch all modules from the backend
 */
export const fetchModules = async (): Promise<ModuleData[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/modules`);
    if (!response.ok) throw new Error('Failed to fetch modules');
    return await response.json();
  } catch (error) {
    console.error("API Error (fetchModules):", error);
    return [];
  }
};

/**
 * Fetch reviews: Merges Server Data (Initial) + LocalStorage Data (User generated)
 */
export const fetchReviews = async (moduleId: string): Promise<Review[]> => {
  let mergedReviews: Review[] = [];

  // 1. Fetch Initial/Server Reviews
  try {
    const response = await fetch(`${API_BASE_URL}/reviews?moduleId=${moduleId}`);
    if (response.ok) {
      const serverData = await response.json();
      mergedReviews = [...serverData];
    }
  } catch (error) {
    console.error("API Error (fetchReviews):", error);
  }

  // 2. Fetch Local User Reviews (Client-side persistence)
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const allLocalReviews: Review[] = JSON.parse(stored);
        const moduleLocalReviews = allLocalReviews.filter(r => r.moduleId === moduleId);
        mergedReviews = [...mergedReviews, ...moduleLocalReviews];
      }
    } catch (e) {
      console.error("LocalStorage Error:", e);
    }
  }

  // 3. Deduplicate (by ID) & Sort by Date (Newest first)
  const uniqueMap = new Map<string, Review>();
  mergedReviews.forEach(r => uniqueMap.set(r.id, r));
  
  return Array.from(uniqueMap.values()).sort((a, b) => 
    new Date(b.date).getTime() - new Date(a.date).getTime()
  );
};

/**
 * Post a new review: Saves to LocalStorage immediately
 */
export const postReview = async (review: Review): Promise<Review> => {
  // 1. Save to LocalStorage (Persistence)
  if (typeof window !== 'undefined') {
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      const allLocalReviews: Review[] = stored ? JSON.parse(stored) : [];
      allLocalReviews.push(review);
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(allLocalReviews));
    } catch (e) {
      console.error("LocalStorage Write Error:", e);
      throw new Error("Could not save review locally");
    }
  }

  // 2. (Optional) Attempt to send to API for validation/mocking, 
  // but we don't rely on it for storage in this serverless demo.
  try {
    fetch(`${API_BASE_URL}/reviews`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(review),
    }).catch(e => console.warn("API post failed (expected in serverless demo)", e));
  } catch (e) {
    // Ignore API errors
  }

  return review;
};