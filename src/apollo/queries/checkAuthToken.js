import { gql, useQuery } from '@apollo/client';
import { useEffect, useState } from 'react';

export const checkAuthToken = gql`
  query {
    checkAuthToken {
      validTokenStatus
    }
  }
`;

function CheckAuthTokenQuery() {
  const [status, setStatus] = useState('');
  let { refetch, data } = useQuery(checkAuthToken);
  useEffect(() => {
    if (data?.checkAuthToken) {
      setStatus(data.checkAuthToken.validTokenStatus);
    }
  }, [data]);

  return { refetch, status };
}

export default CheckAuthTokenQuery;
