const customState = {
  AuthState: { 
    isAuthenticated: false, 
    token:null,
    userId:null,
    name:null, 
    guestCart: [],
    cart:[],
    role:null,
  },


  listeners: [],
};

const AuthAction = {

    initiateAuthState: () => {
        localStorage.setItem('sunState', JSON.stringify(customState.AuthState));
        
        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    updateState: (newState) => {
        customState.AuthState = { ...customState.AuthState, ...newState };
        localStorage.setItem('sunState', JSON.stringify(customState.AuthState));

        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    getState: (key) => {
        const saved = localStorage.getItem(key);
        if (saved) {
        customState.AuthState = JSON.parse(saved);
        }

        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    resetState: () => {
        const saved = JSON.parse(localStorage.getItem('sunState')) || {};
        const guestCart = saved.guestCart || [];
        const cart = saved.cart || [];

        customState.AuthState = {
            isAuthenticated: false,
            token: null,
            userId: null,
            name: null,
            guestCart,
            cart,
        };

        localStorage.setItem('sunState', JSON.stringify(customState.AuthState));
        customState.listeners.forEach(fn => fn(customState.AuthState));
        return customState.AuthState;
    },


    subscribe: (listenerFunction) => {
        customState.listeners.push(listenerFunction);
        listenerFunction(customState.AuthState);
    },
};




export { AuthAction, customState };
