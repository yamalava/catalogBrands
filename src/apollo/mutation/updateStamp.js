import { gql, useMutation } from '@apollo/client';

const updateStamp = gql`
  mutation(
    $id: ID
    $dateHandling: ID
    $numberCatalog: Int
    $stampImage: String
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
    updateStamp(
      id: $id
      dateHandling: $dateHandling
      numberCatalog: $numberCatalog
      stampImage: $stampImage
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

function UpdateCurrentStampMutation() {
  let [updateStampQuery] = useMutation(updateStamp);
  return updateStampQuery;
}

export default UpdateCurrentStampMutation;
