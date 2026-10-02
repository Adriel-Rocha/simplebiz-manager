# SimpleBiz demo accounts

These credentials are intentionally for the public demo environment.

## Administrator

Email:

```text
demo@admin.example
```

Password:

```text
DemoAdmin123!
```

Role:

```text
ADMIN
```

## Standard user

Email:

```text
demo@user.example
```

Password:

```text
DemoUser123!
```

Role:

```text
USER
```

## Important

These are demo credentials. Do not use them for real customer data.

The initializer is controlled by:

```text
DEMO_DATA_ENABLED=true
```

Use that setting only for the public/demo environment.

The users are created with BCrypt-hashed passwords.

The demo clients and products are inserted only when their unique identifiers already do not exist, so application restarts do not create duplicate records.
