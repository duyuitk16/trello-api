/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

// Những domain được truy cập tài nguyên Server
export const WHITELIST_DOMAINS = [
  // 'http://localhost:5173' Không cần localhost nữa vì ở file cors đã luôn luôn cho phép môi trường dev rồi
  // ...vv ví dụ sau này sẽ deploy lên domain chính thức
]
export const BOARD_TYPES = {
  PUBLIC: 'public',
  PRIVATE: 'private'
}