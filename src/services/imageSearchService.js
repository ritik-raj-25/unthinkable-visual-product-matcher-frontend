import axios from "axios";

export class ImageSearchService {
    async searchImages(imageUrl, productImage) {
        if(imageUrl) {
            imageUrl = imageUrl.trim();
            productImage = null;
        }
        if(productImage) {
            imageUrl = null;
        }
        try {
            const formData = new FormData();
            formData.append('productImage', productImage);
            const response = await axios.post(
                `${import.meta.env.VITE_BACKEND_URL}/api/search/images`,
                formData,
                { 
                    params: { imageUrl },
                    headers: { 'Content-Type': 'multipart/form-data' }
                }
            );
            return response.data;
        } catch (error) {
            if (error.response && error.response.data) {
                throw error.response.data;
            }
            throw 'Something went wrong';
        }
    }
}

const imageSearchService = new ImageSearchService();
export default imageSearchService;