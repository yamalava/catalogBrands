import { gql, useMutation } from '@apollo/client';
import { getAllStamps } from '../queries/getAllStamps';

const createStamp = gql`
  mutation(
    $dateHandling: ID
    $numberCatalog: Int
    $numberCatalogMichel: Int
    $name: String
    $series: Int
    $edition: Int
    $size: Int
    $denomination: Int
    $note: String
    $country: String
    $includeCollection: Boolean
  ) {
    createStamp(
      dateHandling: $dateHandling
      numberCatalog: $numberCatalog
      numberCatalogMichel: $numberCatalogMichel
      name: $name
      series: $series
      edition: $edition
      size: $size
      denomination: $denomination
      note: $note
      country: $country
      includeCollection: $includeCollection
    ) {
      id
      year
      dateHandling
      numberCatalog
      numberCatalogMichel
      name
      series
      edition
      size
      denomination
      note
      country
      includeCollection
    }
  }
`;

function CreateStampQuery() {
  let [createStampQuery] = useMutation(createStamp, {
    refetchQueries: () => [{ query: getAllStamps }],
  });
  return createStampQuery;
}

export default CreateStampQuery;
