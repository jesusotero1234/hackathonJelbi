import axios from 'axios'

const API_URL = "http://10.65.0.191:5000"

export default {
	async test() {
		try {
			var url = API_URL + '/full_tier'
			const res = await axios.get(url)
			return res.data
		} catch (e) { throw e }
	},
}