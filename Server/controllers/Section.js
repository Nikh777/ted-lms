const Section = require('../models/Section');
const Course = require('../models/Course');

// create section handler function
exports.createSection = async (req, res) => {
    try {
        // data fetch
        const { sectionName, courseId } = req.body;

        // data validation
        if (!sectionName || !courseId) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }
        
        // create Section
        const newSection = await Section.create({ sectionName });

        // add the section id to the course
        let updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            { $push: { courseContent: newSection._id } },
            { new: true }
        );

        // now populate the courseContent field and nested subsections
        updatedCourseDetails = await Course.findById(courseId)
            .populate({
                path: 'courseContent',
                populate: { path: 'subSection' }
            });

        return res.status(200).json({
            success: true,
            message: 'Section created and added to course',
            updatedCourse: updatedCourseDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating section',
        });
    }
};


exports.updateSection = async (req, res) => {
    try{
        // data input
        const { sectionId, sectionName } = req.body;
        // validation
        if(!sectionId || !sectionName){
            return res.status(400).json({
                success: false,
                message: 'All fields are required',
            });
        }
        // update data
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { sectionName: sectionName },
            { new: true }
        );
        // return response
        return res.status(200).json({
            success: true,
            message: 'Section updated successfully',
            updatedSection,
        });
    }
    catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating section',
        });
    }


    };


    exports.deleteSection = async (req, res) => {
        try{
            // get id
            const { sectionId } = req.body;
            // use find by id and delete
            await Section.findByIdAndDelete(sectionId);

            // also need to remove the section id from the course's courseContent array
            await Course.findOneAndUpdate(
                { courseContent: sectionId },
                { $pull: { courseContent: sectionId } }
            );
            // return response
            return res.status(200).json({
                success: true,
                message: 'Section deleted successfully',
            });
        }
        catch(error){
            console.error(error);
            return res.status(500).json({
                success: false,
                message: 'Something went wrong while deleting section',
            });
        }
    };