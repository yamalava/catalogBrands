import { gql, useMutation } from '@apollo/client';

const registrationUser = gql`
  mutation($login: String, $password: String) {
    registrationUser(login: $login, password: $password) {
      id
    }
  }
`;

function RegistrationUserQuery() {
  const [registrationUserQuery] = useMutation(registrationUser);
  return registrationUserQuery;
}

export default RegistrationUserQuery;
