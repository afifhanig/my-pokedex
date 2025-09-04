import { act } from "@testing-library/react-native";
import { useConnectivityStore } from "../src/store/connectivity.store";

describe("useConnectivityStore", () => {
  beforeEach(() => {
    // Reset state before each test
    useConnectivityStore.setState({ online: true });
  });

  it("should start with online = true", () => {
    expect(useConnectivityStore.getState().online).toBe(true);
  });

  it("should set online to false", () => {
    act(() => {
      useConnectivityStore.getState().setOnline(false);
    });
    expect(useConnectivityStore.getState().online).toBe(false);
  });

  it("should set online to true again", () => {
    act(() => {
      useConnectivityStore.getState().setOnline(false);
    });
    act(() => {
      useConnectivityStore.getState().setOnline(true);
    });
    expect(useConnectivityStore.getState().online).toBe(true);
  });
});
