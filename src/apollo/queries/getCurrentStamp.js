import { gql, useQuery } from '@apollo/client';


const GetCurrentStamp = gql`
  query($id: ID) {
    getCurrentStamp(id: $id) {
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

function GetCurrentStampQuery(props) {
  let { data, loading } = useQuery(GetCurrentStamp, {
    variables: {
      id: props,
    },
  });

  return loading
    ? { loading }
    : { ...data, loading };
}

export default GetCurrentStampQuery;
