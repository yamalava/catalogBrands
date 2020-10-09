import { gql, useQuery } from '@apollo/client';

export const getCurrentStamp = gql`
  query($id: ID) {
    getCurrentStamp(id: $id) {
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
      access
    }
  }
`;

function GetCurrentStampQuery(props) {
  let { data, loading, refetch } = useQuery(getCurrentStamp, {
    variables: {
      id: props,
    },
  });

  return loading ? { loading, refetch } : { ...data, loading, refetch };
}

export default GetCurrentStampQuery;
