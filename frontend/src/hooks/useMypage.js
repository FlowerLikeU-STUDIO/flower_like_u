import useSWR from "swr";

const useMypage = (uid) => {
  const { data, error } = useSWR(`https://nextjs-course-f7f75-default-rtdb.firebaseio.com/${uid}.json`, (url) =>
    fetch(url).then((res) => res.json())
  );
  if (!error && !data) {
    return {
      data: "",
      isLoading: true,
    };
  }

  if (data) {
    if (data.statusCode !== "200") {
      return error;
    }
    return {
      data: data.response,
      type: data.response.type,
      isError: error,
      isLoading: false,
    };
  }
};

export default useMypage;
