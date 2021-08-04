# Instadapp-DSA
Subgraph to track Defi-Smart Accounts(DSA) on Polygon Network
### Query First 50 DSA Accounts
```graphql
{
  accountCreateds(first: 50) {
    id
    account
  }
}
```
