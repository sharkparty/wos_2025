import { validateUserCollection } from './user.schema';


describe('User Collection Schema Validation', () => {
  // TODO: This could have the run order optimized
  // TODO: We could use faker for mock values
  const validUser = {
    "id": "ca9b4d00-a7e3-45b8-b7da-3a39e70e8cbe",
    "createdAt": "2024-02-19T23:16:10.554Z",
    "updatedAt": "2024-08-27T23:16:10.554Z",
    "first": "Julius",
    "last": "Rivera",
    "roleId": "1a235261-fa93-4845-ab48-ee23895998e6",
    "photo": "https://i.pravatar.cc/400?img=68"
  };

  // --- Test 1: Valid Data ---
  test('should pass validation for a collection of valid users', () => {
    const validData = [
      validUser,
      {
        ...validUser,
        "id": "b0c1e2f3-a4b5-c6d7-e8f9-102132435465",
        "first": "Jane"
      }
    ];

    const isValid = validateUserCollection(validData);
    expect(isValid).toBe(true);
    expect(validateUserCollection.errors).toBeNull();
  });

  // --- Test 2: Missing Required Field (Now safer with explicit array check) ---
  test('should fail validation if a required field is missing from an item', () => {
    const invalidData = [
      validUser,
      {
        ...validUser,
        "id": "cba98765-4321-abcd-ef01-234567890123",
        "roleId": undefined // Intentionally remove a required field
      }
    ];
    // Remove the undefined key completely before validation
    delete invalidData[1].roleId;

    const isValid = validateUserCollection(invalidData);
    expect(isValid).toBe(false);

    // Safety check for errors array
    if (validateUserCollection.errors) {
      expect(Array.isArray(validateUserCollection.errors)).toBe(true);
      expect(validateUserCollection.errors.length).toBeGreaterThan(0);
      // Check that the error specifically points to the missing field
      expect(validateUserCollection.errors[0].keyword).toBe('required');
      expect(validateUserCollection.errors[0].params.missingProperty).toBe('roleId');
    } else {
      throw new Error("Expected validation to fail and produce errors, but validateUserCollection.errors was null/undefined.");
    }
  });

  // --- Test 3: Invalid Data Format (UUID) (Now safer with explicit array check) ---
  test('should fail validation if an ID field is not a valid UUID format', () => {
    const invalidData = [
      {
        ...validUser,
        "id": "not-a-valid-uuid-string",
      }
    ];

    const isValid = validateUserCollection(invalidData);
    expect(isValid).toBe(false);

    // Safety check for errors array
    if (validateUserCollection.errors) {
      expect(Array.isArray(validateUserCollection.errors)).toBe(true);
      expect(validateUserCollection.errors.length).toBeGreaterThan(0);
      // Check that the error points to the format violation within the first item
      expect(validateUserCollection.errors[0].instancePath).toBe('/0/id');
      expect(validateUserCollection.errors[0].keyword).toBe('format');
      expect(validateUserCollection.errors[0].params.format).toBe('uuid');
    } else {
      throw new Error("Expected validation to fail and produce errors, but validateUserCollection.errors was null/undefined.");
    }
  });

  // --- Test 4: Invalid Data Format (URL) (Now safer with explicit array check) ---
  test('should fail validation if the photo field is not a valid URL format', () => {
    const invalidData = [
      {
        ...validUser,
        "photo": "just a string, not a url"
      }
    ];

    const isValid = validateUserCollection(invalidData);
    expect(isValid).toBe(false);

    // Safety check for errors array
    if (validateUserCollection.errors) {
      expect(Array.isArray(validateUserCollection.errors)).toBe(true);
      expect(validateUserCollection.errors.length).toBeGreaterThan(0);
      // Check that the error points to the URL format violation
      expect(validateUserCollection.errors[0].instancePath).toBe('/0/photo');
      expect(validateUserCollection.errors[0].keyword).toBe('format');
      expect(validateUserCollection.errors[0].params.format).toBe('url');
    } else {
      throw new Error("Expected validation to fail and produce errors, but validateUserCollection.errors was null/undefined.");
    }
  });

  // --- Test 5: Additional Properties check (Now safer with explicit array check) ---
  test('should fail validation if an item contains an extra property', () => {
    const invalidData = [
      {
        ...validUser,
        "extraField": 123
      }
    ];

    const isValid = validateUserCollection(invalidData);
    expect(isValid).toBe(false);

    // Safety check for errors array
    if (validateUserCollection.errors) {
      expect(Array.isArray(validateUserCollection.errors)).toBe(true);
      expect(validateUserCollection.errors.length).toBeGreaterThan(0);
      expect(validateUserCollection.errors[0].keyword).toBe('additionalProperties');
      expect(validateUserCollection.errors[0].params.additionalProperty).toBe('extraField');
    } else {
      throw new Error("Expected validation to fail and produce errors, but validateUserCollection.errors was null/undefined.");
    }
  });
});