import { gql, useMutation } from '@apollo/client';
import { getAllStamps } from '../queries/getAllStamps';

const deleteStamp = gql`
  mutation($id: ID) {
    deleteStamp(id: $id) {
      id
    }
  }
`;

function DeleteStampMutation() {
  const [deleteStampQuery] = useMutation(deleteStamp, {
    refetchQueries: () => [{ query: getAllStamps }],
  });
  return deleteStampQuery;
}

export default DeleteStampMutation;
