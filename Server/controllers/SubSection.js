const SubSection = require('../models/SubSection');
const Section = require('../models/Section');
const { uploadImageToCloudinary } = require('../utils/imageUploader');


// create subsection handler function
exports.createSubSection = async (req, res) => {
    try {
        console.log("BODY =", req.body);
    console.log("FILES =", req.files);
        // data fetch
        const { title, description, sectionId } = req.body;

        // Extract fie/video
        const video = req.files?.video;
        console.log("TITLE =", title);
        console.log("DESCRIPTION =", description);
        console.log("SECTION ID =", sectionId);
        console.log("VIDEO =", video);

        // data validation  
        if (!title  || !description || !sectionId || !video) {
            return res.status(400).json({ success: false, message: 'All fields are required' });
        }

        // upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        // create subsection
        const newSubSection = await SubSection.create({ title, timeDuration: `${uploadDetails.duration}`, videoURL: uploadDetails.secure_url, description });

        // add the subsection id to the section and return updated section details
        const updatedSectionDetails = await Section.findByIdAndUpdate(
            sectionId,
            { $push: { subSection: newSubSection._id } },
            { new: true }
        ).populate('subSection');

        return res.status(200).json({
            success: true,
            message: 'SubSection created and added to section',
            data: updatedSectionDetails,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while creating subsection',
        });
    }
};  

// update subsection handler function
exports.updateSubSection = async (req, res) => {
    try{
        // data input   
        const { subSectionId, title, description } = req.body;
        const subSection = await SubSection.findById(subSectionId);

        // validation   
        if (!subSection) {
            return res.status(404).json({
                success: false,
                message: 'SubSection not found',
            });
        }

        if (title !== undefined) {
            subSection.title = title;
        }

        if (description !== undefined) {
            subSection.description = description;
        }

        if (req.files && req.files.video !== undefined) {
            const video = req.files.video;
            const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
            subSection.videoURL = uploadDetails.secure_url;
            subSection.timeDuration = `${uploadDetails.duration}`;
        }

        await subSection.save();

        return res.status(200).json({
            success: true,
            message: 'SubSection updated successfully',
            data: subSection,
        });
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while updating subsection',
        });
    }
};

// delete subsection handler function
exports.deleteSubSection = async (req, res) => {    
    try{
        // data input
        const { subSectionId, sectionId } = req.body;   
        // validation
        if(!subSectionId || !sectionId){
            return res.status(400).json({   
                success: false,
                message: 'All fields are required',
            });
        }
        // delete data  
        const subSection = await SubSection.findByIdAndDelete(subSectionId);

        if (!subSection) {
            return res.status(404).json({ success: false, message: "SubSection not found" });
        }

        // remove the subsection id from the section and return updated section details
        const updatedSection = await Section.findByIdAndUpdate(
            sectionId,
            { $pull: { subSection: subSectionId } },
            { new: true }
        ).populate('subSection');

        return res.status(200).json({
            success: true,
            message: 'SubSection deleted successfully',
            data: updatedSection,
        }); 
    }catch(error){
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while deleting subsection',
        });
    }
};  