export const useLabel = (email: string) => {
  const splitEmail = email.split("@")[0].slice(0, 3);
  // combine spliEMail and epoch timestamp to create label
  const timestamp = Date.now().toString();
  return `${splitEmail}_${timestamp}`;
};
