import React, { useEffect, useState } from "react";
import userQuery from "../users.axios";
interface useGetUsersParams {
  n: number;
}

export interface user {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    street: {
      number: number;
      name: string;
    };
    city: string;
    state: string;
    country: string;
    postcode: number;
    coordinates: {
      latitude: string;
      longitude: string;
    };
    timezone: {
      offset: string;
      description: string;
    };
  };
  email: string;
  login: {
    uuid: string;
    username: string;
    password: string;
    salt: string;
    md5: string;
    sha1: string;
    sha256: string;
  };
  dob: {
    date: string;
    age: number;
  };
  registered: {
    date: string;
    age: number;
  };
  phone: string;
  cell: string;
  id: {
    name: string;
    value: string;
  };
  picture: {
    large: string;
    medium: string;
    thumbnail: string;
  };
  nat: string;
}

export interface useGetUsersReturnType {
  users: user[];
  loading: boolean;
  error: boolean;
  hasMore: boolean;
}

async function queryUsers({
  n,
  setLoading,
  setError,
  setHasMore,
}: {
  n: number;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setError: React.Dispatch<React.SetStateAction<boolean>>;
  setHasMore: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  setLoading(true);
  setError(false);
  const results = await userQuery.get(`?results=${n}&seed`);
  const { data } = results;

  setHasMore(data.results.length > 0);

  return data;
}

const useGetUsers: (props: useGetUsersParams) => useGetUsersReturnType = ({
  n,
}: useGetUsersParams) => {
  const [usersList, setUsersList] = useState<user[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(false);
  useEffect(() => {
    queryUsers({ n, setLoading, setError, setHasMore })
      .then((data) => {
        setUsersList([...data.results]);
      })
      .catch((err) => {
        setError(true);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [n]);

  return { users: usersList, loading, error, hasMore };
};
export default useGetUsers;
