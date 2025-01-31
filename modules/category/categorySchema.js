const mongoose = require("mongoose");
const options = {
  versionKey: false,
  timestamps: {
    createdAt: true,
    updatedAt: "modifiedAt",
  },
};

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    order: {
      type: Number,
      // required: true,
    },
    slug:{
      type:String,
      unique: true,
      required: true,
    }
  },
  options
);

CategorySchema.pre("save", async function(next){
  try {
    if(this.isNew){
      console.log(this.isNew,"new");
      
      const lastCategory = await Category.findOne({}, {}, { sort: {order:-1} });
      const lastOrder = lastCategory ? lastCategory.order : 0;
      this.order = lastOrder + 1;
      next();
    }
  } catch (error) {
    next(error);
  }
});
const Category =new mongoose.model("Category", CategorySchema);

module.exports = {
  Category,
};


