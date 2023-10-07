import cookie from 'js-cookie'



// set in cookies
export const setCookie = (key, value) => {
    if(window !== 'undefined') {
        cookie.set(key,value, {
            expires: 1
        })
    }
}


// remove the cookies from browser
export const removeCookie = (key) => {
    if(window !== 'undefined') {
        cookie.remove(key, {
            expires: 1
        })
    }
}

// get from cookie the stored token
// it will be usefull to make request with roken
export const getCookie = (key) => {
    if(window !== 'undefined') {
        return cookie.get(key)
    }
};

// set in localstorage
export const setLocalStorage = (key, value) => {
    if(window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value))
    }
};


//remove from localstorage
export const removeLocalStorage = (key) => {
    if(window !== 'undefined') {
        localStorage.removeItem(key)
    }
};

// authenticate user by passing data to cookie and localsotarage during signin
export const authenticate = (response, next) => {
    console.log('AUTHENTICATE HELPER ON SIGNIN RESPONSE', response);
    setCookie('token', response.data.token);
    setLocalStorage('user', response.data.user);
    next();
};

// access user info from localstorage
export const isAuth = () => {
    if (typeof window === 'undefined') {
      // Server-side rendering, return false by default
      return false;
    }
  
    const cookieChecked = getCookie('token');
  
    if (cookieChecked) {
      const user = localStorage.getItem('user');
      if (user) {
        // Parse the user data from localStorage
        return JSON.parse(user);
      }
    }
  
    // Return false if no token or user data is found
    return false;
  };
  

  export const signout = () => {
    const confirmSignout = window.confirm('Are you sure you want to sign out?');
    if (confirmSignout) {
      removeCookie('token');
      removeLocalStorage('user');
      // Redirect or update UI accordingly
    }
  };
  
  
  
  export const updateUser = (response, next) => {
    console.log('UPDATE USER IN LOCALSTORAGE HELPERS', response)
    if (typeof window !== 'undefined') {
        let auth = JSON.parse(localStorage.getItem('user'));
        auth = { ...auth, ...response.data }; // Merge the new data with existing data
        localStorage.setItem('user', JSON.stringify(auth));
    }
    next();
}

