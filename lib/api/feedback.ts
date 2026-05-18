import { apiFetch } from "./client";

export interface FeedbackItem {
  id: string;
  diagnosis_id: string;
  rating: number;
  comments?: string;
  date: string;
}

export interface FeedbackCreate {
  diagnosis_id: string;
  rating: number;
  comments?: string;
}

export const submitFeedback = (data: FeedbackCreate): Promise<{ id: string; message: string }> =>
  apiFetch("/feedback", { method: "POST", body: JSON.stringify(data) });

export const getFeedback = (): Promise<FeedbackItem[]> =>
  apiFetch("/feedback");
