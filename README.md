# Instadapp-DSA
Subgraph to track Instadapp Defi-Smart Accounts(DSA) on Polygon Network
### GraphQL Endpoint
(https://api.thegraph.com/subgraphs/name/itsjerryokolo/instadapp-dsa)

### Query First 50 DSA Accounts
```graphql
{
  accountCreateds(first: 50) {
    id
    account
  }
}
```
