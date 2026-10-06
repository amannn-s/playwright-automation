# Let's Shop Authentication Test Plan

## Application Overview

Functional test plan for the Rahul Shetty Academy Let's Shop client authentication area at https://rahulshettyacademy.com/client/#/auth/login. Covers login, account registration, password recovery, validation, and navigation. Scenarios assume a fresh browser context and independently begin at the route under test. Use only authorized test identities; successful authentication and account-creation outcomes require environment-approved test data.

## Test Scenarios

### 1. Login

**Seed:** `tests/seed.spec.ts`

#### 1.1. Show required validation for an empty login

**File:** `tests/auth/login-blank-validation.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://rahulshettyacademy.com/client/#/auth/login.
    - expect: The Let's Shop login screen is displayed with Email and Password fields, a Login button, and Forgot password and Register links.
  2. Leave both fields empty and select Login.
    - expect: Required-field validation appears for missing email and password, or an equivalent clear validation response is shown.
    - expect: The user remains on the login route and is not authenticated.

#### 1.2. Reject malformed email during login

**File:** `tests/auth/login-invalid-email.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the login route.
    - expect: The login form is displayed in its initial state.
  2. Enter a malformed email address such as 'not-an-email', enter a non-empty password, and select Login.
    - expect: The malformed email is rejected by validation or authentication does not proceed.
    - expect: The user remains unauthenticated and receives understandable feedback.

#### 1.3. Reject validly formatted but unauthorized credentials

**File:** `tests/auth/login-invalid-credentials.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the login route.
    - expect: The login form is displayed in its initial state.
  2. Enter a syntactically valid email address that is not registered in the test environment and a non-empty incorrect password, then select Login.
    - expect: Authentication is denied with a clear error response.
    - expect: The application does not navigate to an authenticated shopping page and does not expose authenticated account content.

#### 1.4. Sign in with an authorized test account

**File:** `tests/auth/login-success.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the login route. Obtain an active test account's valid email and password from the approved test-data source.
    - expect: The login form is displayed.
  2. Enter the authorized test account credentials and select Login.
    - expect: The application authenticates the user and navigates to its authenticated shopping experience.
    - expect: Authenticated navigation or account content is visible, and the account is not treated as logged out.

#### 1.5. Navigate from login to registration and password recovery

**File:** `tests/auth/login-recovery-navigation.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the login route.
    - expect: Forgot password? and Register here navigation affordances are visible.
  2. Select Forgot password?.
    - expect: The URL changes to the password-new route and the Enter New Password form is displayed.
  3. Open the login route afresh and select the Register link.
    - expect: The URL changes to the registration route and the Register form is displayed.

### 2. Registration

**Seed:** `tests/seed.spec.ts`

#### 2.1. Show required validation for an empty registration

**File:** `tests/auth/register-blank-validation.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://rahulshettyacademy.com/client/#/auth/register.
    - expect: The form shows First Name, Last Name, Email, Phone Number, Occupation, Gender, Password, Confirm Password, and age-confirmation controls.
  2. Leave all fields at their initial values and select Register.
    - expect: Required validation appears for missing first name, email, phone number, password, confirmation password, and age confirmation.
    - expect: Registration does not complete and the user remains on the registration route.

#### 2.2. Reject mismatching registration passwords

**File:** `tests/auth/register-password-mismatch.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the registration route.
    - expect: The registration form is displayed with no prior values.
  2. Fill required identity and contact fields with valid test data, choose an available occupation and gender, enter a password, enter a different confirmation password, select the age confirmation, and submit.
    - expect: The password mismatch is clearly indicated and registration is not completed.
    - expect: The form values are retained where practical so the mismatch can be corrected.

#### 2.3. Validate malformed registration email and phone inputs

**File:** `tests/auth/register-invalid-inputs.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the registration route.
    - expect: The registration form is displayed.
  2. Fill the other required fields with valid test data, provide a malformed email and/or invalid phone value, and submit.
    - expect: Invalid email and phone values are rejected with clear feedback.
    - expect: No account is created until invalid values are corrected.

#### 2.4. Register a new test user with valid details

**File:** `tests/auth/register-success.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the registration route. Generate a unique email and valid phone number using approved test data.
    - expect: The registration form is displayed with the occupation selector at Choose your occupation and neither gender selected.
  2. Enter first name, last name, unique email, phone number, choose one available occupation, select Male or Female, enter matching valid passwords, select I am 18 year or Older, and submit.
    - expect: The registration is accepted and the application presents its success response or next expected account state.
    - expect: The created test identity can authenticate if the application flow is designed to sign in after registration.
    - expect: No field errors remain.

#### 2.5. Prevent registration with an already registered email

**File:** `tests/auth/register-duplicate-email.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the registration route. Obtain an email already registered in the test environment.
    - expect: The registration form is displayed.
  2. Complete all other fields with valid test data and submit using the existing email.
    - expect: The duplicate email is rejected with clear feedback.
    - expect: No second account is created for the existing identity.

#### 2.6. Navigate from registration back to login

**File:** `tests/auth/register-login-navigation.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the registration route.
    - expect: The Already have an account? Login here affordance is visible.
  2. Select Login here.
    - expect: The application navigates to the login route and displays the Email and Password fields.

### 3. Password Recovery

**Seed:** `tests/seed.spec.ts`

#### 3.1. Show required validation for an empty password reset form

**File:** `tests/auth/password-reset-blank-validation.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open https://rahulshettyacademy.com/client/#/auth/password-new.
    - expect: The Enter New Password form shows Email, Password, Confirm Password, Save New Password, Login, and Register controls.
  2. Leave all fields empty and select Save New Password.
    - expect: Required validation appears for email, password, and confirmation password.
    - expect: The reset is not submitted and the user remains on the password-new route.

#### 3.2. Reject mismatching new passwords

**File:** `tests/auth/password-reset-mismatch.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the password-new route.
    - expect: The password reset form is displayed in its initial state.
  2. Enter a valid test email, enter a new password, provide a different confirmation password, and select Save New Password.
    - expect: A clear password mismatch response is shown and the reset is not treated as successful.

#### 3.3. Save a matching new password for an eligible test account

**File:** `tests/auth/password-reset-success.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the password-new route. Obtain an account authorized for password-reset testing.
    - expect: The password reset form is displayed.
  2. Enter the eligible test account email, enter a valid new password in both password fields, and select Save New Password.
    - expect: The application reports the documented reset outcome and does not indicate success if the account or reset prerequisites are not satisfied.
    - expect: If reset succeeds, the new password authenticates and the old password no longer does, where the product's documented policy allows both checks.

#### 3.4. Navigate from password reset to login and registration

**File:** `tests/auth/password-reset-navigation.spec.ts`

**Steps:**
  1. Start from a fresh browser context and open the password-new route.
    - expect: Login and Register links are visible.
  2. Select Login.
    - expect: The application navigates to the login route.
  3. Open the password-new route in a fresh context and select Register.
    - expect: The application navigates to the registration route.
