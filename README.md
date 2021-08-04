# Instadapp-DSA
Subgraph to track Instadapp Defi-Smart Accounts(DSA) on Polygon Network
#### GraphQL Endpoint: https://api.thegraph.com/subgraphs/name/itsjerryokolo/instadapp-dsa

### Query First 50 DSA Accounts
```graphql
{
  accountCreateds(first: 50) {
    id
    account
  }
}
```

### Query DSA created by user
```graphql
{
  accountCreateds(where: {sender: "0xe5c29f92e742e9ac213f2737dbe1beb6ab259832"}) {
    id
    account
    sender
    txHash
    blockNumber
    timestamp
  }
}
```
