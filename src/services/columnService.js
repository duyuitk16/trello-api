/**
 * Updated by trungquandev.com's author on August 17 2023
 * YouTube: https://youtube.com/@trungquandev
 * "A bit of fragrance clings to the hand that gives flowers!"
*/

import { boardModel } from '~/models/boardModel'
import { cardModel } from '~/models/cardModel'
import { columnModel } from '~/models/columnModel'
import ApiError from '~/utils/ApiError'
import { StatusCodes } from 'http-status-codes'

const createNew = async (reqBody) => {
  try {
    const newColumn = {
      ...reqBody
    }
    const createdColumn = await columnModel.createNew(newColumn)
    const getNewColumn = await columnModel.findOneById(createdColumn.insertedId)

    // ...
    if (getNewColumn) {
      // Xử lý cấu trúc dl trước khi trả về FE
      getNewColumn.cards = []

      // Cập nhật mảng columnOrderIds trong board chứa nó
      await boardModel.pushColumnOrderIds(getNewColumn)
    }

    return getNewColumn
  } catch (error) { throw error }
}

const update = async (columnId, reqBody) => {
  try {
    const updateData = {
      ...reqBody,
      updatedAt: Date.now()
    }
    const updatedColumn = await columnModel.update(columnId, updateData)
    return updatedColumn
  } catch (error) { throw error }
}

const deleteItem = async (columnId) => {
  try {
    const targetColumn = await columnModel.findOneById(columnId)

    if (!targetColumn) throw new ApiError(StatusCodes.NOT_FOUND, 'Board not found')

    // Xóa column
    await columnModel.deleteOneByColumnId(columnId)
    // Xóa toàn bộ Cards thuộc Column trên
    await cardModel.deleteManyByColumnId(columnId)
    // Xóa ColumnId trong mảng columnOrderIds của board
    await boardModel.pullColumnOrderIds(targetColumn)

    return { deleteResult: 'Column and its cards were deleted successfully!' }
  } catch (error) { throw error }
}


export const columnService = {
  createNew,
  update,
  deleteItem
}