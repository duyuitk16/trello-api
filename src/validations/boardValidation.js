/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
 */
import Joi from 'joi'
import { StatusCodes } from 'http-status-codes'
import ApiError from '~/utils/ApiError'
import { BOARD_TYPES } from '~/utils/constants'

const createNew = async (req, res, next) => {
  // Ta không cần phải custom message ở BE vì để FE tự validate và custom phía FE cho đẹp
  // BE cần validate để đảm bảo dữ liệu chính xác, trả về messaage mặc định từ thư viện là OK
  // **Note: validate dữ liệu là BẮT BUỘC ở BE vì là điểm cuối để lưu vào DB
  // ==> Hãy luôn validate ở cả FE và BE
  const correctCondition = Joi.object({
    title: Joi.string().required().min(3).max(50).trim().strict().messages({
      'any.required': 'Title is required (duyuitk16)',
      'string.empty': 'Title is not allowed to be empty (duyuitk16)',
      'string.min': 'Title must be at least 3 characters long (duyuitk16)',
      'string.max': 'Title length must be less than or equal to 50 characters long (duyuitk16)',
      'string.trim': 'Title must not have leading or trailing whitespace (duyuitk16)'
    }),
    description: Joi.string().required().min(3).max(256).trim().strict(),
    type: Joi.string().valid(BOARD_TYPES.PUBLIC, BOARD_TYPES.PRIVATE).required()
  })
  try {
    // abortEarly: false để trả về nhiều lỗi nếu có
    await correctCondition.validateAsync(req.body, { abortEarly: false })
    // Dữ liệu hợp lệ rồi thì chuyển request sang controller
    next()
  } catch (error) {
    next(new ApiError(StatusCodes.UNPROCESSABLE_ENTITY, new Error(error).message))
  }
}

export const boardValidation = {
  createNew
}