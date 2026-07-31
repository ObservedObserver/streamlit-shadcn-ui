import { describe, expect, it } from "vitest"

import { paginationTokens } from "@/components/streamlit/pagination"

describe("paginationTokens", () => {
  it("shows every page when the catalog fits", () => {
    expect(paginationTokens(2, 5, 1)).toEqual([1, 2, 3, 4, 5])
  })

  it("shows stable ellipses around a middle page", () => {
    expect(paginationTokens(50, 100, 1)).toEqual([
      1,
      "ellipsis-left",
      49,
      50,
      51,
      "ellipsis-right",
      100,
    ])
  })

  it("expands the beginning and end without duplicate pages", () => {
    expect(paginationTokens(1, 100, 1)).toEqual([
      1,
      2,
      3,
      4,
      5,
      "ellipsis-right",
      100,
    ])
    expect(paginationTokens(100, 100, 1)).toEqual([
      1,
      "ellipsis-left",
      96,
      97,
      98,
      99,
      100,
    ])
  })
})
