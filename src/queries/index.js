import { gql } from "apollo-boost";

export const GET_ALL_USERS = gql`
  {
    allUsers {
      login
    }
  }
`;

export const GET_ALL_BRANDS = gql`
  query($year: Int) {
    allBrands(year: $year) {
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
      note
    }
  }
`;

export const AUTH_USER = gql`
  mutation($login: String, $password: String) {
    authUser(login: $login, password: $password) {
      id
      token
    }
  }
`;

export const REGISTRATION_USER = gql`
  mutation($login: String, $password: String) {
    registrationUser(login: $login, password: $password) {
      id
    }
  }
`;

export const CREATE_BRAND = gql`
  mutation(
    $dateHandling: Float
    $year: Int
    $numberCatalog: Float
    $numberCatalogMichel: Float
    $name: String
    $series: Int
    $edition: Int
    $size: Int
    $denomination: Int
    $note: String
  ) {
    createBrand(
      dateHandling: $dateHandling
      year: $year
      numberCatalog: $numberCatalog
      numberCatalogMichel: $numberCatalogMichel
      name: $name
      series: $series
      edition: $edition
      size: $size
      denomination: $denomination
      note: $note
    ) {
      dateHandling
    }
  }
`;

export const UPDATE_BRAND = gql`
  mutation(
    $id: String
    $dateHandling: Float
    $year: Int
    $numberCatalog: Float
    $numberCatalogMichel: Float
    $name: String
    $series: Int
    $edition: Int
    $size: Int
    $denomination: Int
    $note: String
  ) {
    updateBrand(
      id: $id
      dateHandling: $dateHandling
      year: $year
      numberCatalog: $numberCatalog
      numberCatalogMichel: $numberCatalogMichel
      name: $name
      series: $series
      edition: $edition
      size: $size
      denomination: $denomination
      note: $note
    ) {
      id
    }
  }
`;

export const DELETE_BRAND = gql`
  mutation($id: String) {
    deleteBrand(id: $id) {
      id
    }
  }
`;
