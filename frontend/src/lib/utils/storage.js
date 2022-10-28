const storage = async () => {
  const value = sessionStorage.getItem("ACCESS_TOKEN");
  return value ? true : undefined;
};

export default storage;
