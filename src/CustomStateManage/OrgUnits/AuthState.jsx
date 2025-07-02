const customState = {
  AuthState: { 
    isAuthenticated: false, 
    userId:null,
    name:null, 
    gender:null,
    parent_route:null,
    date_of_journey:null,
    operator_id:null,
    boardingPoint:{},
    droppingPoint:{},
    totalFare:null,
    seatSelected:false,
  },


  listeners: [],
};

const AuthAction = {

    initiateAuthState: () => {
        localStorage.setItem('auth', JSON.stringify(customState.AuthState));
        
        customState.listeners.forEach((fn) => fn(customState.AuthState));
        return customState.AuthState;
    },

    updateState: (newState) => {
        customState.AuthState = { ...customState.AuthState, ...newState };
        localStorage.setItem('auth', JSON.stringify(customState.AuthState));

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
        customState.AuthState = {
            isAuthenticated: false,
            userId: null,
            name: null,
            gender: null,
            busId: null,
            userRoute: null,
            origin: null,
            destination: null,
            RouteInfoId: null,
            finalAmount: null,
        };
        localStorage.setItem('auth', JSON.stringify(customState.AuthState));
        customState.listeners.forEach(fn => fn(customState.AuthState));
        return customState.AuthState;
    },

    subscribe: (listenerFunction) => {
        customState.listeners.push(listenerFunction);
        listenerFunction(customState.AuthState);
    },
};




export { AuthAction, customState };
