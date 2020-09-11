import { gql, useMutation } from '@apollo/client';

const authUser = gql`
  mutation($login: String, $password: String) {
    authUser(login: $login, password: $password) {
      token
    }
  }
`;

function AuthUserQuery() {
  let [authUserQuery, { loading }] = useMutation(authUser);
  return { authUserQuery, loading };
}

export default AuthUserQuery;
