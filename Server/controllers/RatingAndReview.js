const mongoose = require("mongoose");
const RatingAndReview = require('../models/RatingAndReview');
const Course = require('../models/Course');

// create Rating
exports.createRating = async (req, res) => {
    try{
        // get user id
        const userId = req.user.id;
        // data fetch
        const { rating, review, courseId } = req.body;

        // check if user is enrolled or not
        const courseDetails = await Course.findOne({ _id: courseId, studentsEnrolled: { $elemMatch: { $eq: userId } } });
        if (!courseDetails) {
            return res.status(400).json({
                success: false,
                message: 'User is not enrolled in this course',
            });
        }

       // check if user already reviewed the course
       const alreadyReviewed = await RatingAndReview.findOne({ user: userId, course: courseId });
      
    
       if (alreadyReviewed) {
        
        return res.status(400).json({
            success: false,
            message: 'User has already reviewed this course',
        });
    }
    
    // create rating and review
    const ratingAndReview = await RatingAndReview.create({
        user: userId,
        rating: rating,
        review: review,
        course: courseId,
    });

    // update course with this rating/review
    const updatedCourseDetails = await Course.findOneAndUpdate(
    { _id: courseId },
        {
            $push: { ratingAndReviews: ratingAndReview._id },
        },
        { new: true }
    );
    console.log(updatedCourseDetails);


    // return response
    return res.status(200).json({
        success: true,
        message: 'Rating and review created successfully',
        ratingAndReview,
    });
}
catch(error){
    console.error(error);
    return res.status(500).json({
        success: false,
        message: 'Something went wrong',
    });
}
}

// get average rating
exports.getAverageRating = async (req, res) => {
    try{
        // get course id
        const courseId = req.body.courseId;

        // calculate avg rating
        const result = await RatingAndReview.aggregate([
            {
                $match: { course: new mongoose.Types.ObjectId(courseId) },
            },
            {
                $group: {
                    _id: null,
                    averageRating: { $avg: '$rating' },
                },
            
            }
        ])
        // return rating 
        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                averageRating: result[0].averageRating,
            });
        } 
        // if no rating / review exist 
        return res.status(200).json({
            success: true,
            averageRating: 0,
        });
    }
    catch(error){
        console.log (error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

// get all rating
exports.getAllRating = async (req, res) => {
    try{
        const allReviews = await RatingAndReview.find({})
        .sort({ rating: "desc"})
        .populate({
            path: 'user',
            select: 'firstName lastName email image',
        })
        .populate({
            path: 'course',
            select: 'courseName',
        })
        .exec();
        return res.status(200).json({
            success: true,
            allReviews,
        });
    }
 
    catch (error) {
    console.log(error)
    return res.status(500).json({
        success: false,
        message: error.message,
    });
}
}

// get all top ratings
exports.getTopSellingCourses = async (req, res) => {
    try {

        const courses = await Course.aggregate([

            {
                $lookup: {
                    from: "ratingandreviews",
                    localField: "ratingAndReviews",
                    foreignField: "_id",
                    as: "ratings"
                }
            },

            {
                $addFields: {
                    avgRating: { $avg: "$ratings.rating" },
                    totalStudentsEnrolled: { $size: "$studentsEnrolled" }
                }
            },

            {
                $sort: {
                    totalStudentsEnrolled: -1,
                    avgRating: -1
                }
            },

            {
                $limit: 5
            }

        ]);

        return res.status(200).json({
            success: true,
            data: courses,
            message: "Top selling courses fetched successfully"
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Error fetching top selling courses"
        });
    }
}