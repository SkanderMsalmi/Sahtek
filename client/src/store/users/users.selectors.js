export const selectUser = (state) => state.user.user;
export const selectToken = (state) => state.user.token;
export const isAuthenticated = (state) => !!state.user.token;
export const isPatient = (state) => state.user.user?.__typename === 'Patient';
export const isTherapist = (state) => state.user.user?.__typename === 'Therapist';

