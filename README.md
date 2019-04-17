## Scoped mutations

```javascript
  mutation($id: ID!, $name: String!) {
    user(id: $id) {
      updateName(name: $name) {
        id
        name
      }
    }
  }
```

instead of

```javascript
  mutation($id: ID!, $name: String!) {
    updateUserName(id: $id, name: $name) {
      id
      name
    }
  }
```
