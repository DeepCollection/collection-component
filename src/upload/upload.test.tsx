import {
  render,
  fireEvent,
  waitFor,
  getByAltText,
  getByTestId,
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import * as React from "react";
import UploadCom from "./index";
import "@testing-library/jest-dom";
import "regenerator-runtime/runtime";

describe("upload", () => {
  it("mount successfullly", () => {
    const { getByTestId } = render(<UploadCom />);
    expect(getByTestId("upload-component")).toBeDefined();
    expect(getByTestId("upload-component")).toMatchSnapshot();
  });
  it("upload and show preview successfully", async () => {
    const { getByAltText, getByText } = render(<UploadCom />);
    // 1. Open file dialog
    fireEvent.click(getByText(/点击上传/));
    // 2. Mock file data
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const inputEl = document.querySelectorAll(
      '[type="file"]'
    )[0] as HTMLInputElement;

    Object.defineProperty(inputEl, "files", { value: [file] });

    // 3. Change data of file dialog
    fireEvent.change(inputEl);

    // 4. Wait to re-render
    await waitFor(() => getByAltText("preview"));

    // 5. Compare the image url
    const dataURL = (getByAltText("preview") as HTMLImageElement).src;
    expect(dataURL).toMatchSnapshot("data:image/png;base64,KOKMkOKWoV/ilqEp");
  });
  it("remove successfully", async () => {
    const { getByAltText, getByText, getAllByTestId, queryByTestId } = render(
      <UploadCom />
    );
    // 1. Open file dialog
    fireEvent.click(getByText(/点击上传/));
    // 2. Mock file data
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const inputEl = document.querySelectorAll(
      '[type="file"]'
    )[0] as HTMLInputElement;

    Object.defineProperty(inputEl, "files", { value: [file] });

    // 3. Change data of file dialog
    fireEvent.change(inputEl);

    // 4. Wait to re-render
    await waitFor(() => getByAltText("preview"));
    const dataURL = (getByAltText("preview") as HTMLImageElement).src;
    expect(dataURL).toMatchSnapshot("data:image/png;base64,KOKMkOKWoV/ilqEp");
    fireEvent.click(getByText(/remove/));
    expect(queryByTestId("image_0")).toBeNull();
  });
  it("change image successfully", async () => {
    const {
      getByAltText,
      getByTestId,
      getByText,
      getAllByTestId,
      queryByTestId,
    } = render(<UploadCom />);
    // 1. Open file dialog
    // fireEvent.click(getByText(/点击上传/));
    // 2. Mock file data
    const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
    const inputEl = document.querySelectorAll(
      '[type="file"]'
    )[0] as HTMLInputElement;

    // Object.defineProperty(inputEl, "files", { value: [file], writable: true });

    // 3. Change data of file dialog
    fireEvent.change(inputEl, {
      target: {
        files: [file],
      },
    });

    // 4. Wait to re-render
    await waitFor(() => getByAltText("preview"));
    const dataURL = (getByAltText("preview") as HTMLImageElement).src;
    expect(dataURL).toMatchSnapshot("data:image/png;base64,KOKMkOKWoV/ilqEp");
    const newFile = new File(["(□_□⌐)"], "chucknorris.png", {
      type: "image/png",
    });
    fireEvent.click(getByTestId("change_0"));
    fireEvent.change(inputEl, {
      target: {
        files: [newFile],
      },
    });
    // 4. Wait to re-render
    await waitFor(
      () =>
        new Promise((res, rej) => {
          setTimeout(() => {
            res(true);
          }, 100);
        })
    );
    const newDataURL = (getByAltText("preview") as HTMLImageElement).src;
    console.log(newDataURL);
    expect(newDataURL).toMatchSnapshot("data:image/png;base64,KOKWoV/ilqHijJA");
  });
});
