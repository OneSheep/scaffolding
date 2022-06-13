# Documentation site for PROJECT_NAME

## Content

To update the handbook content, edit the files in the `docs` folder following the
[Docsify][1] conventions.

## Development

To host the documentation site behind a basic auth wall localy:

```
docker build -t cis/docs .
docker run -e BASIC_AUTH_USERNAME=user -e BASIC_AUTH_PASSWORD=password -p 80:80 cis/docs
```

Environment variables:

- BASIC_AUTH_USERNAME
- BASIC_AUTH_PASSWORD
- PORT (defaults to 80)
- CLIENT_MAX_BODY_SIZE (defaults to 1m)

[1]: https://docsify.js.org/
