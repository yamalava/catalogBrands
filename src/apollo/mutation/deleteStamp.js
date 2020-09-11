import { gql, useMutation } from '@apollo/client';

const deleteStamp = gql`
  mutation($id: String) {
    deleteBrand(id: $id) {
      id
    }
  }
`;
