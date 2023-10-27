import axios from 'axios'
import { NODE_URL } from '../Constants/Constant'

const Instance=axios.create({
    baseURL:NODE_URL
})

export default Instance
