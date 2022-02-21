import App from "../App.svelte";
import { render, screen } from "@testing-library/svelte"
import "@testing-library/jest-dom";

describe("Main App page", () => {
    it("is rendering", () => {
        render(App);
    });
    it("has input fields", () => {
        const { container } = render(App);
        expect(container.querySelectorAll("input").length).toBe(2);
    });
    it("has buttons", () => {
        const { container } = render(App);
        expect(container.querySelectorAll("button").length).toBe(6);
    });
    it("has width input field", () => {
        render(App);
        const input = screen.getByPlaceholderText("width");
        expect(input).toBeInTheDocument();
    });
    it("has length input field", () => {
        render(App);
        const input = screen.getByPlaceholderText("length");
        expect(input).toBeInTheDocument();
    });
})