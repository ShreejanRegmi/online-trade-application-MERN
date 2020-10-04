import axios from 'axios';

const deleteToken = () => {
    if (axios.defaults.headers.common['Authorization'])
        delete axios.defaults.headers.common['Authorization'];
}

export default deleteToken;