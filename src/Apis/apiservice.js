

const signin = (data, cb) => {
    try {
        fetch(process.env.REACT_APP_API_URL + '/signin', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: data
        }).then(response => {
            cb(response, true);
        })
    }
    catch (error) {
        cb(error, false)
    }
}

const signup = (data, cb) => {
    try {
        fetch(process.env.REACT_APP_API_URL + '/signup', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: 'POST',
            body: data
        }).then(response => {
            cb(response, true)
        })
    }
    catch (error) {
        cb(error, false)
    }
}

const getUser = (token, cb) => {
    try {
        fetch(process.env.REACT_APP_API_URL + '/user/me', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            cb(response, true);
        })
    }
    catch (error) {
        cb(error, false)
    }
}

const getAllPosts = (token, cb) => {
    try {
        fetch(process.env.REACT_APP_API_URL + '/get_all_posts', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            cb(response, true)
        })
    }
    catch (error) {
        cb(error, false)
    }
}

const getLikedPosts = (token, cb) => {
    try {
        fetch(process.env.REACT_APP_API_URL + '/get_liked_posts', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            cb(response, true)
        })
    }
    catch (error) {
        cb(error, false)
    }
}

const getPublicPosts = (cb) => {
    try {
        fetch(process.env.REACT_APP_API_URL + '/get_public_posts', {
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Access-Control-Allow-Origin':'*'
            },
            mode: 'cors',
            method: "GET"
        }).then((response) => {
            cb(response, true)
        })
    }
    catch (error) {
        cb(error, false)
    }
}

const getYourPosts = (token, cb) => {
    try {
        fetch(process.env.REACT_APP_API_URL + '/get_your_posts', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            cb(response, true);
        })
    }
    catch (error) {
        cb(error, false)
    }
}

const logout = (token,cb) => {
    try{
        fetch(process.env.REACT_APP_API_URL + '/user/logout', {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            method: "GET"
        }).then((response) => {
            cb(response,true);
        })
    }
    catch (error) {
        cb(error, false)
    }
}

module.exports = {
    signin: signin,
    signup: signup,
    getUser: getUser,
    getAllPosts: getAllPosts,
    getPublicPosts: getPublicPosts,
    getYourPosts: getYourPosts,
    getLikedPosts: getLikedPosts,
    logout: logout
}