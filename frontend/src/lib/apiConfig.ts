const API_BASE_URL = `${import.meta.env.VITE_BACKEND_API_URL as string}api/`;

export const API_ENDPOINTS = {
  LOGIN: API_BASE_URL + "login.php",
  STUDENT_REGISTER: API_BASE_URL + "student-register.php",
  TUTOR_REGISTER: API_BASE_URL + "tutor-register.php",
  TUTORS: API_BASE_URL + "tutors.php",
  BOOK_SESSION: API_BASE_URL + "book-session.php",
  SESSIONS: API_BASE_URL + "sessions.php",
  DELETE_SESSION: API_BASE_URL + "delete-session.php",
  EDIT_PROFILE: API_BASE_URL + "edit-profile.php",
};
