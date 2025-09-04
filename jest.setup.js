/* eslint-disable no-undef */
// jest.setup.js
import mockAsyncStorage from "@react-native-async-storage/async-storage/jest/async-storage-mock";

// Mock AsyncStorage everywhere
jest.mock("@react-native-async-storage/async-storage", () => mockAsyncStorage);

// Ensure clean state between tests
beforeEach(() => {
  mockAsyncStorage.clear();
});
