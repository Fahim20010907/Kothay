import axios from 'axios';

const API_BASE_URL = 'https://kothay-xg8g.vercel.app/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Markets API
export const getMarkets = async (category = 'all') => {
    const url = category === 'all' ? '/markets' : `/markets?category=${category}`;
    const response = await api.get(url);
    return response.data.data;
};

export const getMarketById = async (id) => {
    const response = await api.get(`/markets/${id}`);
    return response.data.data;
};

// Street Food API
export const getStreetFood = async (category = 'all') => {
    const url = category === 'all' ? '/street-food' : `/street-food?category=${category}`;
    const response = await api.get(url);
    return response.data.data;
};

export const getStreetFoodById = async (id) => {
    const response = await api.get(`/street-food/${id}`);
    return response.data.data;
};

// Reviews API
export const getReviewsByStallId = async (stallId) => {
    const response = await api.get(`/reviews/street-food/${stallId}`);
    return response.data;
};

export default api;