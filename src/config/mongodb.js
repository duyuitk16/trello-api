/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */

import { MongoClient, ServerApiVersion } from 'mongodb'
import { env } from '~/config/environment'

// Khởi tạo 1 đối tượng trelloDatabaseInstance ban đầu là null (do chưa kết nối DB)
let trelloDatabaseInstance = null

// Khởi tạo 1 đối tượng mongoClientInstance để connect tới mongoDB
const mongoClientInstance = new MongoClient(env.MONGODB_URI, {
  // Dùng serverApi để chỉ định stable API version của mongoDB
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true
  }
})

// Kết nối tới DB
export const CONNECT_DB = async () => {
  // Gọi kết nối tới MongoDB Atlas với URI đã khai báo trong thân mongoClientInstance
  await mongoClientInstance.connect()

  // Kết nối thành công --> lấy ra DB theo tên và gán ngược lại vào biến trelloDatabaseInstance
  trelloDatabaseInstance = mongoClientInstance.db(env.DATABASE_NAME)
}

// Đóng kết nối khi cần
export const CLOSE_DB = async () => {
  // console.log('Dang chay vo day')
  await mongoClientInstance.close()
}

// Export biến trelloDatabaseInstance sau khi đã kết nối thành công để sử dụng nhiều nơi trong code
// Lưu ý: chỉ gọi khi sau khi đã kết nối thành công tới mongoDB
export const GET_DB = () => {
  if (!trelloDatabaseInstance) throw new Error('Must connect to DB first!')
  return trelloDatabaseInstance
}
