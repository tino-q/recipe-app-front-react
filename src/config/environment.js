import dotenv from 'dotenv';

dotenv.config();

export default {
    RECIPE_API_BASE_URL: process.env.REACT_APP_RECIPE_API_BASE_URL || null,
};
