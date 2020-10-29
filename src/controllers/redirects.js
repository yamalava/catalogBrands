export const goToHome = (history) => {
  return history.push('/');
};

export const goToAuth = (history) => {
  return history.push('/auth');
};

export const goToRegistration = (history) => {
  return history.push('/registration');
};

export const goToCurrentStamp = (history, id) => {
  return history.push(`/stamp/${id}`);
};
