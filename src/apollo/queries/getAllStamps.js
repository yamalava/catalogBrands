import { gql, useQuery } from '@apollo/client';
import { useState, useEffect } from 'react';

export const getAllStamps = gql`
  query($year: Int) {
    allStamps(year: $year) {
      id
      dateHandling
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
    if (data) {
      if (data.allStamps.length !== 0) {
        let sort = data.allStamps
          .slice()
          .sort((a, b) => a.dateHandling - b.dateHandling);
        setStampCatalog(sort);
      } else {
        setStampCatalog([]);
      }
    } else {
      setStampCatalog([]);
    }
    return () => {
      setStampCatalog([]);
    };
  }, [data]);

  return { stampCatalog, loading, refetch };
}

export default GetAllStampsQuery;
