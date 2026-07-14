const cron = require('node-cron');
const User = require('../models/User');
const Profile = require('../models/Profile');
const Course = require('../models/Course');

// Schedule the task to run every day at midnight
exports.scheduleAccountDeletion = () => {
    cron.schedule('0 0 * * *', async () => {
        console.log('Running Cron Job: Delete Expired Accounts');
        try {
            const expiredUsers = await User.find({
                deletionScheduled: true,
                deletionDate: { $lt: new Date() }
            });

            for (const user of expiredUsers) {
                // Delete Profile
                await Profile.findByIdAndDelete(user.additionalDetails);
                
                // Unenroll from courses
                await Course.updateMany(
                    { studentsEnrolled: user._id },
                    { $pull: { studentsEnrolled: user._id } }
                );

                // Delete User
                await User.findByIdAndDelete(user._id);
                console.log(`Deleted user: ${user._id}`);
            }
        } catch (error) {
            console.error('Error in Cron Job:', error);
        }
    });
};
