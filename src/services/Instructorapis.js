// ADD these exports into your existing src/services/apis.js file
// alongside your existing exports

const BASE_URL = process.env.REACT_APP_BASE_URL;

export const instructorEndpoints = {
  APPLY_FOR_INSTRUCTOR_API: `${BASE_URL}/instructor/apply`,
  GET_MY_APPLICATION_API: `${BASE_URL}/instructor/my-application`,
};

export const adminInstructorEndpoints = {
  GET_PENDING_APPLICATIONS_API: `${BASE_URL}/admin/instructor/requests`,
  GET_ALL_APPLICATIONS_API: `${BASE_URL}/admin/instructor/all`,
  GET_PENDING_COUNT_API: `${BASE_URL}/admin/instructor/count`,
  APPROVE_APPLICATION_API: `${BASE_URL}/admin/instructor/approve`,
  REJECT_APPLICATION_API: `${BASE_URL}/admin/instructor/reject`,
};