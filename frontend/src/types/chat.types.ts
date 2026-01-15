export interface ChatMessage {
  id: string
  itr_request_id: string
  sender_id: string
  receiver_id: string
  message: string
  attachment_url?: string
  is_read: boolean
  created_at: string
}

export interface ChatUser {
  id: string
  full_name: string
  user_type: UserType
  profile_image_url?: string
}