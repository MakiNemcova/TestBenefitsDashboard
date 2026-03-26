# API Bug Reports

## API Bug: The API documentation states that username is a required

**Endpoint:**  POST /api/Employees
**Description:** The API documentation states that username is a required field when creating a new employee. I am able to add a new employee without a username in the request schema, which does not match the API documentation. In the response, the username is shown as my login username.

**Steps to Reproduce:**
1. Request {
  "firstName": "Jan",
  "lastName": "Novak",
  "dependants": 5,
  "salary": 52000
}
2. Response {
    "partitionKey": "TestUser933",
    "sortKey": "33c462f2-1b69-4db1-9b7a-18020219f597",
    "username": "TestUser933",
    "id": "33c462f2-1b69-4db1-9b7a-18020219f597",
    "firstName": "Jan",
    "lastName": "Novak",
    "dependants": 5,
    "salary": 52000,
    "gross": 2000,
    "benefitsCost": 134.61539,
    "net": 1865.3846
}

**Expected Result:** 
API behavior and documentation should be consistent:
either username is required and must be provided
or it is optional and automatically derived (and documented as such)

**Actual Result:**
API allows missing username, but documentation states it is required.

**Severity:** Medium

**Screenshots:** evidence/screenshots/API/APIBug2.png

---

## API Bug: For the PUT request, the ID is not required in the API documentation.

**Endpoint:**  PUT /api/Employees
**Description:** The API documentation states that id is not required. This could result in updating a different employee, since two employees can have the same name. However, updating the wrong employee will not occur because the API request requires the "id" field.

**Steps to Reproduce:**
1. Request {
  "firstName": "Anna",
  "lastName": "Martinkova",
  "dependants": 6,
  "salary": 52000
}

2. Response 405
Method Not Allowed

**Expected Result:** 
ID is required in PUT request in API documentation

**Actual Result:**
ID is NOT required  in PUT request in API documentation

**Severity:** Medium

**Screenshots:** 
evidence/screenshots/API/APIBug4_1.png
evidence/screenshots/API/APIBug4_2.png

---

## API Bug: Inconsistent usage between the API and the UI, “Dependants” vs. "Dependents"

**Endpoint:**  POST /api/Employees
**Description:** In the API schema, the user uses “Dependants”, while the UI and requirements use “Dependents”.

**Steps to Reproduce:**
1. Send schema in API{
  "username": "jan.novak",
  "firstName": "Jan",
  "lastName": "Novak",
  "dependants": 5,
  "salary": 52000
} 
2. In UI in Paylocity Benefits Dashboard see for Jan Novak 5 in Dependents column

**Expected Result:**
The same name for column in API and UI

**Actual Result:** 
 Inconsistent usage between the API and the UI

**Severity:** Low

**Screenshots:** 
evidence/screenshots/API/APIBug1_1.png
evidence/screenshots/API/APIBug1_2.png

---

## API Bug: Required string fields allow empty values due to minLength: 0

**Endpoint:**  POST /api/Employees
**Description:** The API documentation states that firstName and lastName are required field and at the same time, they can have minLength: 0, which is contradictory.

**Steps to Reproduce:**
1. Request {
  "firstName": "",
  "lastName": "Novak",
  "dependants": 4,
  "salary": 52000
}
2. Response  {
        "memberNames": [
            "FirstName"
        ],
        "errorMessage": "The FirstName field is required."
    }

**Expected Result:** 
minLength: 1

**Actual Result:**
minLength: 0

**Severity:** Low

**Screenshots:** evidence/screenshots/API/APIBug3.png

---

## API Bug: GET /api/Employees/{id} returns 200 with empty body after employee deletion

**Endpoint:** 
**Description:** Client cannot reliably distinguish deleted employee from malformed/empty successful response.

**Steps to Reproduce:**
1. Create employee via POST /api/Employees
2. Verify employee exists via GET /api/Employees/{id} → 200 with JSON body
3. Delete employee via DELETE /api/Employees/{id} → 200
4. Call GET /api/Employees/{id} again

**Expected Result:** 
One of:

404 Not Found for deleted/non-existing employee, or
410 Gone, or
explicitly documented 200 response with defined payload indicating deleted state

**Actual Result:**
200 OK
empty response body

**Severity:** Medium

**Screenshots:** evidence/screenshots/API/APIBug5.png

## API Bug: Mismatch between OpenAPI specification and actual API behavior

**Endpoint:** POST/api/Employees
**Description:** 
It appears that the API behavior is not fully aligned with the OpenAPI schema for the Employee object.
Requests that include undefined properties are accepted and processed successfully, even though the schema specifies additionalProperties: false.

This may lead to inconsistencies between the documented contract and actual API behavior, making it harder for clients to rely on the schema.

**Steps to Reproduce:**
1. Request {
  "firstName": "Lucia",
  "lastName": "Novak",
  "dependants": 7,
  "age": 37
}
2. Response {
    "partitionKey": "TestUser933",
    "sortKey": "5a5144f4-8083-4c3e-aa04-204a9125be20",
    "username": "TestUser933",
    "id": "5a5144f4-8083-4c3e-aa04-204a9125be20",
    "firstName": "123",
    "lastName": "Novak",
    "dependants": 7,
    "salary": 52000,
    "gross": 2000,
    "benefitsCost": 173.07693,
    "net": 1826.9231
}

**Expected Result:** 
Request should be rejected (e.g. 400 Bad Request), because:

Age is not defined in schema (additionalProperties: false)

**Actual Result:**
200 OK
Employee is successfully created
Age is silently ignored

**Severity:** Medium

**Screenshots:** evidence/screenshots/APIBug6.png