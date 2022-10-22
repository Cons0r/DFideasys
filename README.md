# Diamondfire idea System
Links to your diamondfire plot to show game ideas your players have submitted


api:

GET /api/ideas
returns array
```json
[
    {
        "_id": "String",
        "username": "String",
        "uuid": "String",
        "pages": "String[]"
    }
]
```

POST /api/ideas

This is the route your plot will use

body:
```json
{
    "uuid": "String",
    "pages": "String[]"
}
```

GET /api/ideas/\[id\]
returns one idea
```json
{
    "_id": "id",
    "username": "String",
    "uuid": "String",
    "pages": "String[]"
}
```

GET /api/ideas/\[id\]/book
returns list of strings
```json
["page 1", "page 2", ..."page n"]
```

GET /api/ideas/\[id\]/book/\[page\]
returns string
```json
"page n"
```