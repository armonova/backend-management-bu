import mongoose, { Schema } from 'mongoose'

const videoSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  intruments: {
    type: [Schema.ObjectId],
    ref: 'Instruments'
  },
  year: {
    type: Number
  },
  championship: {
    type: String
  },
  link: {
    type: String
  }
}, {
  timestamps: true,
  toJSON: {
    virtuals: true,
    transform: (obj, ret) => { delete ret._id }
  }
})

// TODO: update all the api with new atributer on model schema

videoSchema.methods = {
  view (full) {
    const view = {
      // simple view
      id: this.id,
      user: this.user.view(full),
      intrument: this.intrument,
      year: this.year,
      championship: this.championship,
      link: this.link,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    }

    return full ? {
      ...view
      // add properties for a full view
    } : view
  }
}

const model = mongoose.model('Video', videoSchema)

export const schema = model.schema
export default model
