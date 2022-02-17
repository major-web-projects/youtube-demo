import ErrorHelper from "../helpers/errorHelper.js";
import { catchAsyncErrors } from "../middlewares/errorMiddleware.js";
import CategoryModel from "../models/CategoryModel.js";

const list = catchAsyncErrors(async (req, res, next) => {
  const categories = await CategoryModel.find();

  res.json({ status: "ok", categories });
});

const create = catchAsyncErrors(async (req, res) => {
  const { name } = req.body;

  const category = new CategoryModel({ name });
  await category.save();
  res.json({ status: "ok", category });
});

const categoryBySlug = catchAsyncErrors(async (req, res, next) => {
  const slug = req.params.slug;
  const category = await CategoryModel.findOne({ slug });

  if (!category) {
    return next(new ErrorHelper("Category not found", 404));
  }
  res.json({ status: "ok", category });
});

const read = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await CategoryModel.findById(categoryId);
  if (!category) {
    return next(new ErrorHelper("Category not found", 404));
  }
  res.json({ status: "ok", category });
});

const update = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const { name } = req.body;

  const category = await CategoryModel.findByIdAndUpdate(
    categoryId,
    { name },
    { new: true }
  );

  res.json({ status: "ok", category });
});

const remove = catchAsyncErrors(async (req, res, next) => {
  const categoryId = req.params.categoryId;
  const category = await CategoryModel.findByIdAndRemove(categoryId);
  if (!category) {
    return next(new ErrorHelper("Category not found", 404));
  }
  res.json({ status: "ok", category });
});

export default { create, list, categoryBySlug, read, update, remove };
