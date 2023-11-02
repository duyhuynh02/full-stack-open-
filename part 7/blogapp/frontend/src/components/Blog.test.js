import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

test("renders blog content", () => {
  const blog = {
    title: "This blog is for rendering blog testing: Title and Author",
    author: "duyhuynh",
    user: { username: "test_user", password: "test_password" },
  };

  const { container } = render(<Blog blog={blog} />);
  const div = container.querySelector(".blog");
  expect(div).toHaveTextContent(
    "This blog is for rendering blog testing: Title and Author",
  );
});

describe("Show or Hide blogs", () => {
  let container;
  const blog = {
    title: "Show or Hide blogs testing",
    author: "duyhuynh",
    url: "http://fullstackopen.com",
    likes: 7,
    user: { username: "test_user", password: "test_password" },
  };

  const mockHandler = jest.fn();

  beforeEach(() => {
    container = render(
      <Blog blog={blog} handleLikes={mockHandler} />,
    ).container;
  });

  test("render its children first", async () => {
    await screen.findAllByText("Show or Hide blogs testing", { exact: false });
  });

  test("at start the blog detail is not displayed", () => {
    const div = container.querySelector(".showDetail");
    expect(div).toHaveStyle("display: none");
  });

  test("after clicking the button, the blog detail is displayed", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("show detail");
    await user.click(button);

    const div = container.querySelector(".showDetail");
    expect(div).not.toHaveStyle("display: none");
  });

  test("after clicking the button twice", async () => {
    const user = userEvent.setup();
    const button = screen.getByText("likes");
    await user.click(button);
    await user.click(button);

    expect(mockHandler.mock.calls).toHaveLength(2);
  });
});
