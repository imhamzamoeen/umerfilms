# API Specification

## REST API Specification

```yaml
openapi: 3.0.0
info:
  title: UmerFilms Portfolio API
  version: 1.0.0
  description: API for UmerFilms portfolio contact form

servers:
  - url: /api
    description: Relative API path

paths:
  /contact:
    post:
      summary: Submit contact form
      description: Sends an inquiry email to Umer
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/ContactSubmission'
      responses:
        '200':
          description: Email sent successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContactResponse'
        '400':
          description: Validation error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContactResponse'
        '500':
          description: Server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ContactResponse'

components:
  schemas:
    ContactSubmission:
      type: object
      required:
        - name
        - email
        - projectType
        - message
      properties:
        name:
          type: string
          minLength: 1
          maxLength: 100
        email:
          type: string
          format: email
        projectType:
          type: string
          enum: [Commercial, Music Video, Wedding, Short Film, Other]
        message:
          type: string
          minLength: 10
          maxLength: 2000
        honeypot:
          type: string
          description: Spam detection field - must be empty

    ContactResponse:
      type: object
      properties:
        success:
          type: boolean
        message:
          type: string
        error:
          type: string
```

---
