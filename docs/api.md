## API endpoints documentation

Here is the documentation for what each endpoint does

| API endpoint                |                              Description                             |
|-----------------------------|:--------------------------------------------------------------------:|
| /app/                           | Default response to check if API is running                          |
| /app/new/user                   | Creating a new user in the database.                                 |
| /app/users                      | Returning a list of users in userinfo.                               |
| /app/user/:logged               | Returning a single user based on login status.                       |
| /app/delete/logged/:logged      | Delete a single user based on logged status.                         |
| /app/update/user/:logged        | Update all user fields based on login status.                        |
| /app/update/user/logged/:logged | Update user's login status to be :logged based on username and pass. |
| /app/update/user/logoff/:logged | Update user's login status to be :logged based on current logged.    |
| /app/new/interaction            | Create new entry in interactionsdb with logged in user and score.    |
| /app/interactions/              | Return the list of scores from each play and the associated user.    |


 