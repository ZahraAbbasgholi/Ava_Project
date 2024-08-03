import axios from 'axios';

const tokenForMediaUrls = 'a85d08400c622b50b18b61e239b9903645297196';
const tokenForMediaFile = 'd3a08cd693cdac5e8eb50c10ada68b98bfea1f09';
const tokenForMediaImage = 'd6e0206d421c91200d2753c24892bb95d365e74c';

// set axios
const axiosInstance = axios.create({
  baseURL: 'https://harf.roshan-ai.ir',
  headers: {
    'Content-Type': 'application/json',
  },
});

// requests
export const transcribeMediaUrl = async (mediaUrl) => {
  try {
    const response = await axiosInstance.post('/api/transcribe_files/', {
      media_urls: [mediaUrl],
    }, {
      headers: {
        Authorization: `Token ${tokenForMediaUrls}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error transcribing media URL:', error);
    throw error;
  }
};

export const transcribeMediaFile = async (file) => {
  const formData = new FormData();
  formData.append('language', 'FA');
  formData.append('media', file);

  try {
    const response = await axios.post('https://harf-dev.roshan-ai.ir/api/transcribe_files/', formData, {
      headers: {
        Authorization: `Token ${tokenForMediaFile}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error transcribing media file:', error);
    throw error;
  }
};

export const listRequests = async () => {
  try {
    const response = await axiosInstance.get('/api/requests/', {
      headers: {
        Authorization: `Token ${tokenForMediaUrls}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error listing requests:', error);
    throw error;
  }
};

export const getMediaImage = async (mediaUrl) => {
  try {
    const response = await axiosInstance.get(`/media_image/${encodeURIComponent(mediaUrl)}`, {
      headers: {
        Authorization: `Token ${tokenForMediaImage}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting media image:', error);
    throw error;
  }
};

export const searchApi = async (query) => {
  try {
    const response = await axiosInstance.post('/api/search/', {
      query,
    }, {
      headers: {
        Authorization: `Token ${tokenForMediaUrls}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error searching API:', error);
    throw error;
  }
};

export const requestDetail = async (requestId) => {
  try {
    const response = await axiosInstance.get(`/api/requests/${requestId}/`, {
      headers: {
        Authorization: `Token ${tokenForMediaUrls}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error getting request detail:', error);
    throw error;
  }
};

export const deleteRequest = async (requestId) => {
  try {
    const response = await axiosInstance.delete(`/api/requests/${requestId}/`, {
      headers: {
        Authorization: `Token ${tokenForMediaUrls}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error deleting request:', error);
    throw error;
  }
};