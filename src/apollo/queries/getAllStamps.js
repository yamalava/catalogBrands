import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

export const getAllStamps = gql`
  query($year: Int) {
    allStamps(year: $year) {
      id
      dateHandling
      stampImage
      year
      numberCatalog
      numberCatalogMichel
      name
      series
      edition
      size
      denomination
      includeCollection
      country
      note
    }
  }
`;

function GetAllStampsQuery() {
  const [stampCatalog, setStampCatalog] = useState([]);
  let { refetch, data, loading } = useQuery(getAllStamps);

  useEffect(() => {
    if (data?.allStamps.length > 0) {
      let sort = data?.allStamps
        .slice()
        .sort((a, b) => a.dateHandling - b.dateHandling);
      setStampCatalog(sort);
    } else {
      setStampCatalog([]);
    }
  }, [data]);

  return { stampCatalog, loading, refetch };
}

export default GetAllStampsQuery;
