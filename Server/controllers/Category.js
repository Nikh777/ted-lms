const Category = require("../models/category");

// Random category select karne ke liye
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    await Category.create({
      name,
      description,
    });

    return res.status(200).json({
      success: true,
      message: "Category created successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Show All Categories
exports.showAllCategories = async (req, res) => {
  try {
    const categories = await Category.find({})
      .populate({
        path: "courses",
        match: { status: "Published" },
      });

    console.log(categories);

    return res.status(200).json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Category Page Details
exports.categoryPageDetails = async (req, res) => {
  try {
    const { categoryId } = req.body;

    const selectedCategory = await Category.findById(categoryId)
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: [
          {
            path: "instructor",
          },
          {
            path: "ratingAndReviews",
          },
        ],
      })
      .exec();

    if (!selectedCategory) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const categoriesExceptSelected = await Category.find({
      _id: { $ne: categoryId },
    });

    let differentCategory = null;

    if (categoriesExceptSelected.length > 0) {
      differentCategory = await Category.findById(
        categoriesExceptSelected[
          getRandomInt(categoriesExceptSelected.length)
        ]._id
      )
        .populate({
          path: "courses",
          match: { status: "Published" },
          populate: {
            path: "instructor",
          },
        })
        .exec();
    }

    const allCategories = await Category.find()
      .populate({
        path: "courses",
        match: { status: "Published" },
        populate: {
          path: "instructor",
        },
      })
      .exec();

    const allCourses = allCategories.flatMap((cat) => cat.courses);

    // studentsEnrolled ke basis par sort
    const mostSellingCourses = allCourses
      .sort(
        (a, b) =>
          (b.studentsEnrolled?.length || 0) -
          (a.studentsEnrolled?.length || 0)
      )
      .slice(0, 10);

    return res.status(200).json({
      success: true,
      data: {
        selectedCategory,
        differentCategory,
        mostSellingCourses,
      },
    });
  } catch (error) {
    console.log("CATEGORY PAGE ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};