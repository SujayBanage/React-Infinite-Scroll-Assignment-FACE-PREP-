import { renderHook } from "@testing-library/react";
import useGetUsers from "./useGetUsers.hook";
test("useGetUsersHook initial work", () => {
  const { result } = renderHook(useGetUsers, {
    initialProps: {
      n: 20,
    },
  });
  expect(result.current.users).toHaveLength(0);
  expect(result.current.error).toEqual(false);
  expect(result.current.loading).toEqual(true);
  expect(result.current.hasMore).toEqual(false);
});
