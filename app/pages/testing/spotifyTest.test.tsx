import TestPage from "app/pages/testing/spotifyTest"
import { render } from "test/utils"
const search = require("../../spotifyAPI/useSearch")

jest.mock("app/spotifyAPI/useSearch")

search.useSearch.mockImplementation(() => {
  return {
    query: "",
    search: () => {},
    searchResults: { artists: { items: [{ name: "Test", id: 1 }] } },
  }
})

test("should mock useSearch", async () => {
  const { getByText, queryAllByRole } = render(<TestPage />)
  expect(search.useSearch).toHaveBeenCalledTimes(1)

  const listItem = getByText(/test/i)
  const listItems = queryAllByRole("listitem")
  expect(listItem).toBeInTheDocument()
  expect(listItems.length).toBe(1)
})
