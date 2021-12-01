## API endpoints documentation

Here is the documentation for what each endpoint does

| API endpoint                |                              Description                             |
|-----------------------------|:--------------------------------------------------------------------:|
| /app/                       | Default response to check if API is running                          |
| /app/new/user               | Creating a new user in the database.                                 |
| /app/users                  | Returning a list of users.                                           |
| /app/user/:user             | Returning a single user based on id.                                 |
| /app/delete/user/:id        | Delete a single user based on id.                                    |
| /app/new/interaction        | Update the "current user" database to keep track of the active user. |
| /app/interactions/          | Return the current users from the current user  database.            |
| /app/interaction/:id        | Return a single user from the active users list  based on id.        |
| /app/delete/interaction/:id | Delete a single user based on id from active  users list.            |