import mongoose, { Schema } from 'mongoose'

const youtubeApiSchema = new Schema({}, { timestamps: true })

youtubeApiSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('YoutubeApi', youtubeApiSchema)

export const schema = model.schema
export default model
