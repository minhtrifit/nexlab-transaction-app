import { gql } from "@apollo/client";

export const GET_TRANSACTIONS = gql`
  query GetTransactions {
    transactions {
      id
      name
      type
      category
      date
      amount
    }
  }
`;

export const GET_TRANSACTION_BY_ID = gql`
  query GetTransaction($id: ID!) {
    transaction(id: $id) {
      id
      name
      type
      category
      date
      amount
    }
  }
`;

export const DELETE_TRANSACTION = gql`
  mutation DeleteTransaction($id: ID!) {
    deleteTransaction(id: $id)
  }
`;

// export const CREATE_TRANSACTION = gql`
//   mutation CreateTransaction(
//     $name: String!
//     $type: TransactionType!
//     $category: CategoryType!
//     $date: String!
//     $amount: Float!
//   ) {
//     createTransaction(
//       name: $name
//       type: $type
//       category: $category
//       date: $date
//       amount: $amount
//     ) {
//       id
//       name
//       type
//       category
//       date
//       amount
//     }
//   }
// `;

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction(
    $name: String!
    $type: String!
    $category: String!
    $date: String!
    $amount: Int!
  ) {
    createTransaction(
      name: $name
      type: $type
      category: $category
      date: $date
      amount: $amount
    ) {
      id
      name
      type
      category
      date
      amount
    }
  }
`;

export const UPDATE_TRANSACTION = gql`
  mutation UpdateTransaction(
    $id: ID!
    $name: String
    $type: String!
    $category: String!
    $date: String
    $amount: Int
  ) {
    updateTransaction(
      id: $id
      name: $name
      type: $type
      category: $category
      date: $date
      amount: $amount
    ) {
      id
      name
      type
      category
      date
      amount
    }
  }
`;
